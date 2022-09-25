import React from "react";
import SidePanelCanvas from "./SidePanelCanvas";
import './SidePanel.css';
import FiguresTypes from "./util/FiguresTypes";
import PinType from "./util/PinType";

class SidePanel extends React.Component{

    render() {
        let categoriesButtons = this.props.categoriesProto !== null
            ?
                this.props.categoriesProto.map((el, index) => {
                return(
                    <li key={index}>
                        <button onClick={() => {
                            if (this.props.pinType.category === el.id && el.type === FiguresTypes.MARKER)
                                this.changePinTypeToDefault();
                            else
                                this.changePinType(el);
                        }} >
                            <img src={el.icon} alt={"Logo"} className='icon'/>
                        </button>
                    </li>
                )
                })
            :
                null;

        return (
            <SidePanelCanvas>
                <ul>
                    {
                        categoriesButtons
                    }
                    <li style={{marginTop: '80%'}}>
                        <button onClick={() => {
                            this.handleRemoveButtonActive();
                            this.changePinTypeToDefault();
                        }}><img src="https://www.svgrepo.com/show/171102/delete.svg" alt={"Logo"} className='icon' /></button>
                    </li>
                </ul>
            </SidePanelCanvas>
        );
    };

    handleRemoveButtonActive = () => {
        this.props.handleRemoveButtonActive(!this.props.isRemoveButtonActive);
    };

    changePinType = (element) => {
        this.props.handlePinTypeChange(
            new PinType(element.id, element.type, element.color, element.isUnique, this.props.mapId)
        );
    };

    changePinTypeToDefault = () => {
        this.props.handlePinTypeChange(
            new PinType("none", "none", "none", false, this.props.mapId)
            );
    };
}

export default SidePanel;