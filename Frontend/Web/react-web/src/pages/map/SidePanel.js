import React, {useState} from "react";
import SidePanelCanvas from "./SidePanelCanvas";
import './SidePanel.css';
import FiguresTypes from "./util/FiguresTypes";
import PinType from "./util/PinType";
import PopUpWithBlurCanvas from "../../components/popUp/PopUpWithBlurCanvas";
import {Button} from "react-bootstrap";

const SidePanel = (props) => {

    const [isActive, setActive] = useState(false);
    const [popupStyle, setPopupStyle] = useState(null);
    const [popupChildren, setPopupChildren] = useState(null);
    const handleActiveChange = () => {
        setActive(!isActive);
    }
    const popupChildrenContent = (el) => {
        return <Button onClick={() => {
            if (props.pinType.category === el.id && el.type === FiguresTypes.MARKER)
                changePinTypeToDefault();
            else
                changePinType(el);
            setActive(false);
        }} >
            Указать на карте
        </Button>
    }
        let categoriesButtons = props.categoriesProto !== null
            ?
                props.categoriesProto.map((el, index) => {
                    return(
                        <li key={index}>
                            <button onClick={() => {
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
                <ul>
                    {
                        categoriesButtons
                    }
                    <RenderCategoriesPopUp/>
                    <li style={{marginTop: '80%'}}>
                        <button onClick={() => {
                            handleRemoveButtonActive();
                            changePinTypeToDefault();
                        }}><img src="https://www.svgrepo.com/show/171102/delete.svg" alt={"Logo"} className='icon' /></button>
                    </li>
                </ul>
            </SidePanelCanvas>
        );

    function handleRemoveButtonActive() {
        props.handleRemoveButtonActive(!props.isRemoveButtonActive);
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