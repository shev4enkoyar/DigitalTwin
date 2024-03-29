import React, { useState } from "react";
import { Button } from "reactstrap/lib";
import PopUpWithBlurCanvas from "../../components/popUp/PopUpWithBlurCanvas";
import './SidePanel.css';
import SidePanelCanvas from "./SidePanelCanvas";
import FiguresTypes from "./util/FiguresTypes";
import PinType from "./util/PinType";
import {
    Container,
    Form,
    FormGroup,
    Input
} from "reactstrap";
import { ButtonDropdown } from "./components/ButtonDropdown";

const SidePanel = (props) => {

    const popupChildrenContent = (el) => {
        let points = "";
        return (
            <div className="py-3">
                <h5 className="text-center" style={{ marginBottom: "10px" }}>Укажите координаты<br /> через запятую:</h5>
                <Form>
                    <FormGroup style={{ margin: "0 5px" }} className="mb-1" controlId="formBasicEmail">
                        <Input onChange={(event) => points = event.target.value} placeholder="Введите координаты" />
                        <p className="text-muted">
                            <em>Пример ввода:<br /> 25.33245, 12.555663, 12.22345, 12.555667</em>
                        </p>
                    </FormGroup>
                </Form>
                <Container className="text-center">
                    <Button color="primary" onClick={() => {
                        if (points === "")
                            alert("Точки не указаны!")
                        else
                            changePinTypeWithPoints(el, points);
                    }}>
                        Создать элемент
                    </Button>
                    <p className="my-0">или</p>
                    <Button color="primary" onClick={() => {
                        if (props.pinType.category === el.id && el.type === FiguresTypes.MARKER)
                            changePinTypeToDefault();
                        else
                            changePinType(el);
                    }
                    }>
                        Указать на карте
                    </Button>
                </Container>
            </div>
        );
    }

    let categoriesButtons = props.categoriesProto !== null
        ?
        props.categoriesProto.filter(el => {
            if (props.isCadaster)
                if (el.isUnique)
                    return false;
            return true;
        }).map((el, index) => {
            return (
                <li style={{ listStyleType: "none" }} key={index} className="mt-3">
                    <ButtonDropdown el={el}>
                        {popupChildrenContent(el)}
                    </ButtonDropdown>
                </li>
            )
        })
        :
        null;

    return (
        <SidePanelCanvas>
            <ul style={{ padding: 0 }}>
                {
                    categoriesButtons
                }
                <li style={{ marginTop: '80%', listStyleType: "none" }}>
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

    function changePinTypeWithPoints(element, points) {
        let pinType = new PinType(element.id, element.type, element.color, element.isUnique, props.mapId);
        pinType.points = points;
        props.handlePinTypeChange(
            pinType
        );
    }

    function changePinType(element) {
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