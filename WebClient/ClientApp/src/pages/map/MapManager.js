import React, { useState } from 'react';
import DTMap from "./DTMap";
import GrpcContainer from "./GrpcContainer";
import SidePanel from "./SidePanel";
import PinType from "./util/PinType";

const MapManager = (props) => {
    let [pinType, setPinType] = useState(
        new PinType("none", "none", "none", false, props.mapId
        ));
    let [categoriesProto, setCategoriesProto] = useState(null);
    let [figuresProto, setFiguresProto] = useState(null);
    let [isRemoveButtonActive, setRemoveButtonActive] = useState(false);
    let [isCadaster, setCadaster] = useState(props.isCadaster);
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
    let panel = props.isCadaster ? null : <SidePanel isCadaster={isCadaster} mapId={props.mapId} categoriesProto={categoriesProto} pinType={pinType} handlePinTypeChange={handlePinTypeChange} isRemoveButtonActive={isRemoveButtonActive} handleRemoveButtonActive={handleRemoveButtonActive} />
    return (

        <div style={{ height: "100%" }}>
            {panel}
            <DTMap sendProductArea={props.sendProductArea} figureInitData={props.figureInitData} removeFigureInfo={props.removeFigureInfo} sendFigureInfo={props.sendFigureInfo} figuresProto={figuresProto} pinType={pinType} isRemoveButtonActive={isRemoveButtonActive} />
            <GrpcContainer mapId={props.mapId} handleFigureCategoriesProto={handleFigureCategoriesProto} handleFiguresProto={handleFiguresProto} />
        </div>

    );


}

export default MapManager;