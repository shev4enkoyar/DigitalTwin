import React from "react";
import CardForBody from "../cardForBody/CardForBody";
import "./PopUpCanvas.css";
const PopUpWithBlurCanvas = (props) => {
    const RenderBlur = () => {
        if (props.isBlur)
            return <div className={props.isActive ? "blur active":"blur"}/>;
        else
            return null;
    }
    return (
        <div style={props.styleFlex} className={props.isActive ? "containerForPop active" : "containerForPop"}  onClick={() => { props.handleActiveChange() }}>
            <RenderBlur />
            <CardForBody className={props.className} onClick={e => e.stopPropagation()}>
                {props.children}
            </CardForBody>
        </div>
    );
}

export default PopUpWithBlurCanvas;