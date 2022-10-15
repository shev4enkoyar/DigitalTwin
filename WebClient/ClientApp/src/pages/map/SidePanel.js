import React, {useState} from "react";
import SidePanelCanvas from "./SidePanelCanvas";
import './SidePanel.css';
import FiguresTypes from "./util/FiguresTypes";
import PinType from "./util/PinType";
import PopUpWithBlurCanvas from "../../components/popUp/PopUpWithBlurCanvas";
import {Button, Form} from "react-bootstrap";

const SidePanel = (props) => {

    const [isActive, setActive] = useState(false);
    const [popupStyle, setPopupStyle] = useState(null);
    const [popupChildren, setPopupChildren] = useState(null);
    const handleActiveChange = () => {
        setActive(!isActive);
    }
    const popupChildrenContent = (el) => {
        let points = "";
        return (
            <>
                <h5 style={{ marginBottom: "10px" }}>Укажите координаты<br/> через запятую:</h5>
                <Form.Group style={{ margin: "0 5px"}} className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={(event) => points = event.target.value} placeholder="Введите координаты" />
                    <Form.Text className="text-muted">
                        Пример ввода:<br/> 25.33245,12.555663,12.22345,12.555667
                    </Form.Text>
                </Form.Group>
                <Button onClick={() => {
                    if (points === "")
                        alert("Точки не указаны!")
                    else
                        changePinTypeWithPoints(el, points);
                }}>
                    Создать элемент
                </Button>
                <p>или</p>
                <Button onClick={() =>
                    {
                        if (props.pinType.category === el.id && el.type === FiguresTypes.MARKER)
                            changePinTypeToDefault();
                        else
                            changePinType(el);
                        setActive(false);
                    }
                }>
                    Указать на карте
                </Button>
            </>
        );
    }
    const buttonStyle = {
        backgroundColor: "transparent",
        backgroundRepeat: "no-repeat",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        outline: "none",
        width: "fit-content"
    }
        let categoriesButtons = props.categoriesProto !== null
            ?
                props.categoriesProto.map((el, index) => {
                    return(
                        <li style={{listStyleType: "none"}} key={index}>
                            <button style={buttonStyle} onClick={() => {
                                setPopupChildren(popupChildrenContent(el))
                                setPopupStyle({margin: 20 + (index + 1) * 32 + "px 50px"});
                                handleActiveChange();
                            }} >
                                <img style={{height: "30px"}} src={el.icon} alt={"Logo"} className='icon'/>
                            </button>
                        </li>
                    )
                })
            :
                null;

        const RenderCategoriesPopUp = () => {
            return <PopUpWithBlurCanvas styleFlex={popupStyle} isActive={isActive} handleActiveChange={handleActiveChange} >
                        {popupChildren}
                   </PopUpWithBlurCanvas>
        }

        return (
            <SidePanelCanvas>
                <ul style={{padding: 0}}>
                    {
                        categoriesButtons
                    }
                    <RenderCategoriesPopUp/>

                    <li style={{marginTop: '80%', listStyleType: "none"}}>
                        <button className="mapSidebarButton" onClick={() => {
                            handleRemoveButtonActive();
                            changePinTypeToDefault();
                        }}>
                            <img src="https://www.svgrepo.com/show/171102/delete.svg" alt={"Logo"} className='icon' />
                        </button>

                    </li>
                </ul>

            </SidePanelCanvas>
        );

    function handleRemoveButtonActive() {
        props.handleRemoveButtonActive(!props.isRemoveButtonActive);
    }

    function changePinTypeWithPoints(element, points){
        let pinType = new PinType(element.id, element.type, element.color, element.isUnique, props.mapId);
        pinType.points = points;
        props.handlePinTypeChange(
            pinType
        );
    }

    function changePinType(element){
        props.handlePinTypeChange(
            new PinType(element.id, element.type, element.color, element.isUnique, props.mapId)
        );
    }

    function changePinTypeToDefault() {
        props.handlePinTypeChange(
            new PinType("none", "none", "none", false, props.mapId)
            );
    }


}

export default SidePanel;