import CardForBody from "../cardForBody/CardForBody";
import "./PopUpCanvas.css"
import PropTypes from "prop-types";
const PopUpWithBlurCanvas = (props) => {
    const RenderBlur = () => {
        if (props.isBlur)
            return <div className={"blur"}/>;
        else
            return null;
    }
    return (
        <div className={props.isActive ? "containerForPop active" : "containerForPop"} onClick={() => { props.handleActiveChange() }}>
            <RenderBlur />
            <CardForBody onClick={e => e.stopPropagation()}>
                {props.children}
            </CardForBody>
        </div>
    );
}

PopUpWithBlurCanvas.propTypes ={
    children: PropTypes.element.isRequired,
    isActive : PropTypes.bool.isRequired,
    handleActiveChange: PropTypes.func.isRequired
}

export default PopUpWithBlurCanvas;