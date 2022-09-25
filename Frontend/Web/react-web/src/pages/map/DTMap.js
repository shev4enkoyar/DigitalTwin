import React, {useState, useEffect} from 'react';
import '@turf/turf';
import L from 'leaflet';
import {intersect} from "@turf/turf";
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
/*import  '../../../../../../../leaflet-react/src/Leaflet.Editable';*/
import {area, polygon} from "@turf/turf";
import FiguresTypes from "./util/FiguresTypes";
import CustomFigure from "./util/CustomFigure";
import FigureModel from "../../database/models/mapMicroservice/FigureModel";
import PinType from "./util/PinType";
import useUnload from "../../util/useUnload";

let figures = [], polygonsIntersect = [], unique = new PinType(null, null, null, false, null);
const DTMap = (props) => {
    const [map, setMap] = useState(null);

    useUnload((e) => {
        e.preventDefault();
        disableAllPolygonsEdit();
        props.sendProductArea(getCulturePolygonArea().toString());
    });

    useEffect(() => {
        if (map != null){
            disableAllPolygonsEdit();
            addFigure(props.pinType);
        }

    }, [props.pinType]);

    useEffect(() => {
        if (map != null){
            let lastFigure = figures.pop();
            lastFigure._db_id = props.figureInitData;
            figures.push(lastFigure);
        }

    }, [props.figureInitData]);

    useEffect(() => {
        let figuresInfos = props.figuresProto;
        if (figuresInfos != null) {
            if (figuresInfos.length > 0){

                let polygonPoints = [];
                let point = [];
                figuresInfos.forEach((element) => {

                    if (element.type === FiguresTypes.POLYGON){
                        let pointsArray = element.points.split(",");
                        pointsArray.forEach(value => {
                            point.push(value);
                            if (point.length === 2){
                                polygonPoints.push(point);
                                point = [];
                            }
                        })
                        addPolygonByProto(polygonPoints, element);
                        polygonPoints = [];
                    }

                    else if (element.type === FiguresTypes.MARKER){
                        let point = element.points.split(",");
                        addMarker(point, {id: element.id, categoryId: element.categoryId, mapId: element.mapId});
                    }
                });

            }
        }
    }, [props.figuresProto]);

    useEffect(() => {
        if (map != null && figures.length > 0) {
            figures.forEach((element) => {
                if (props.isRemoveButtonActive)
                    element.figure.on('click', function () {
                        removeFigure(element);
                    })
                else{
                    element.figure.removeEventListener('click');
                }
            })
        }
    },  [props.isRemoveButtonActive])


    const addFigure = (pinType) => {
        if (!isUniquesIncludesPinType(pinType)){
            if (pinType.type === FiguresTypes.MARKER){
                map.on('click', function (e) {
                    addMarker(e.latlng, {id: null, categoryId: pinType.category, mapId: pinType.mapId});
                })
            } else {
                map.removeEventListener('click');
            }
            if (pinType.type === FiguresTypes.POLYGON)
                addPolygon({category : pinType.category, mapId: pinType.mapId, isUnique: pinType.isUnique});
        }

    }

    const sendFigure = (customFigure) => {
        props.sendFigureInfo(new FigureModel(customFigure._db_id, customFigure._map_id , customFigure._category_id,  getFigurePoints(customFigure.figure).toString()));
    }

    const sendRemoveFigure = (customFigure) => {
        props.removeFigureInfo(customFigure._db_id);
    }

    const addPolygon = (options) => {
        let polygon = map.editTools.startPolygon(null, {color: props.pinType.color});
        configureCustomPolygon(polygon, options);
    }

    const addPolygonByProto = (polygonPoints, polygonProto) => {
        let pinType;
        pinType = new PinType(polygonProto.categoryId, polygonProto.type, polygonProto.color, polygonProto.isUnique, polygonProto.mapId);
        if (!isUniquesIncludesPinType(pinType)){
            let polygon = L.polygon(polygonPoints, {color: pinType.color});
            polygon.addTo(map);
            configureCustomPolygonByProto(polygon, polygonProto, pinType.isUnique);
        }
    }

    const configureCustomPolygon = (polygon, options) => {
        let customFigure = new CustomFigure();
        customFigure.figure = polygon;
        customFigure._category_id = options.category;
        customFigure._map_id = options.mapId;
        customFigure.isUnique = options.isUnique;
        configurePolygon(polygon, customFigure);
    }

    const configureCustomPolygonByProto = (polygon, polygonProto, isUnique) => {
        let customFigure = new CustomFigure();
        customFigure._db_id = polygonProto.id;
        customFigure._map_id = polygonProto.mapId;
        customFigure._category_id = polygonProto.categoryId;
        customFigure.figure = polygon;
        customFigure.isUnique = isUnique;
        configurePolygon(polygon, customFigure);
    }

    const configurePolygon = (polygon, customFigure) => {
        polygon.on('dblclick', function () {
            polygon.toggleEdit();
        });
        polygon.on('editable:disable', function () {
            if (figures.length > 1 && customFigure.isUnique)
                addIntersectionPolygon();
            sendFigure(customFigure);
        });
        polygon.on('editable:enable', function () {
            if (polygonsIntersect.length > 0){
                removeAllIntersectionPolygons();
            }
        })
        figures.push(customFigure);
    }

    const addMarker = (points, options) => {
        let maker = L.marker(points, {icon: new L.Icon({iconUrl: 'https://www.svgrepo.com/show/425042/boat-sailing-ship.svg'})}).addTo(map);
        configureCustomMarker(maker, options);
    }

    const configureCustomMarker = (maker, options) => {
        let customFigure = new CustomFigure();
        customFigure.figure = maker;
        customFigure._category_id = options.categoryId;
        customFigure._map_id = options.mapId;
        customFigure._db_id = options.id;
        figures.push(customFigure);
        if (options.id === null)
            sendFigure(customFigure);
    }

    const getFigurePoints = (figure) => {
        let figurePoints = [];
        if (figure instanceof L.Marker)
            return [figure._latlng.lat, figure._latlng.lng];
        figure.getLatLngs()[0].map((el) => figurePoints.push([el.lat, el.lng]));
        return figurePoints;
    }

    const removeAllIntersectionPolygons = () => {
        polygonsIntersect.splice(0, polygonsIntersect.length);
    }

    const addIntersectionPolygon = () => {
        let tPolygons = [];
        figures.filter(el => el.figure instanceof L.Polygon).map((el) => tPolygons.push(convertLPolygonToTPolygon(el.figure)));
        if (tPolygons.length > 0) {
            let intersectionTurf = intersect(...tPolygons);
            if (intersectionTurf !== null) {
                let intersectionTurfPoints = intersectionTurf.geometry.coordinates;
                let intersection = L.polygon(intersectionTurfPoints);
                polygonsIntersect.push(intersection);
            }
        }
    }

    const convertLPolygonToTPolygon = (figure) => {
        if (figure === null)
            return null;
        if (!(figure instanceof L.Polygon))
            return null;
        if (figure.getLatLngs()[0].length < 4){
            alert("У полигона культуры модели должно быть 4 точки или больше. В ином случае расчёт площади не будет проведён.");
            return null;
        }
        let figurePoints = getFigurePoints(figure);
        figurePoints.push(figurePoints[0]);
        return polygon([figurePoints]);
    }

    const getCulturePolygonArea = () => {
        let intersectionPolygonsArea = 0;
        let culturePolygon;
        let culturePolygonArea;

        if (polygonsIntersect.length !== 0)
            polygonsIntersect.map((el) => {
                intersectionPolygonsArea += area(convertLPolygonToTPolygon(el));
                return null;
            })
        else
            intersectionPolygonsArea = 0;

        if (figures.length > 0)
            culturePolygon = figures.find((element) => {
                return isUniquesIncludesCategory(element._category_id);
            })

        if (culturePolygon === null)
            return 0;
        if (typeof culturePolygon !== 'undefined')
            culturePolygonArea = getPolygonArea(culturePolygon.figure);
        else
            return 0;

        return culturePolygonArea - intersectionPolygonsArea;
    }

    const getPolygonArea = (figure) => {
        return area(convertLPolygonToTPolygon(figure));
    }

    const removeFigure = (customFigure) => {
        if (isUniquesIncludesCategory(customFigure._category_id))
            unique = new PinType(null, null, null, false, null);
        figures.splice(figures.indexOf(customFigure), 1);
        sendRemoveFigure(customFigure);
        map.removeLayer(customFigure.figure);
    }

    const disableAllPolygonsEdit = () => {
        if (figures.length > 0)
            figures.map((element) => element.figure.disableEdit());
    }

    const isUniquesIncludesCategory = (category) => {
        return unique.category === category;
    }
    const isUniquesIncludesPinType = (pinType) => {
        if (pinType.isUnique){
            if (unique.equals(pinType))
                return true;
            unique = pinType;
        }
        return false;
    }

    return (
      <div style={{position: 'sticky'}}>
        <MapContainer  className="map"
          center={[35.6892, 51.3890]} 
          zoom={20}
          maxZoom={18}
          fullscreenControl={true}
          editable={true}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://www.esri.com/">Esri</a> i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </MapContainer>
      </div>
    );
  }

export default DTMap;