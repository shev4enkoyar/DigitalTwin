import DTMap from "./DTMap";
import React, {useState} from 'react';
import SidePanel from "./SidePanel";
import GrpcContainer from "./GrpcContainer";
import PinType from "./util/PinType";

const MapManager = (props) => {
    let [pinType, setPinType] = useState(
        new PinType("none", "none", "none", false, props.mapId
        ));
    let [categoriesProto, setCategoriesProto] = useState(null);
    let [figuresProto, setFiguresProto] = useState(null);
    let [isRemoveButtonActive, setRemoveButtonActive] = useState(false);
    function handleFigureCategoriesProto(categories) {
        setCategoriesProto(categories);
    }
    function handleFiguresProto(figures) {
        setFiguresProto(figures);
    }
    function handlePinTypeChange(pinType) {
        setPinType(pinType);
    }
    function handleRemoveButtonActive(isRemoveButtonActive) {
        setRemoveButtonActive(isRemoveButtonActive);
    }
    return (
        <div style={{height: "100%"}}>
            <SidePanel mapId={props.mapId} categoriesProto={categoriesProto} pinType={pinType} handlePinTypeChange={handlePinTypeChange} isRemoveButtonActive={isRemoveButtonActive} handleRemoveButtonActive={handleRemoveButtonActive}/>
            <DTMap sendProductArea={props.sendProductArea} figureInitData={props.figureInitData} removeFigureInfo={props.removeFigureInfo} sendFigureInfo={props.sendFigureInfo} figuresProto={figuresProto} pinType={pinType} isRemoveButtonActive={isRemoveButtonActive}/>
            <GrpcContainer mapId={props.mapId} handleFigureCategoriesProto={handleFigureCategoriesProto} handleFiguresProto={handleFiguresProto}/>
        </div>

    );
}

export default MapManager;