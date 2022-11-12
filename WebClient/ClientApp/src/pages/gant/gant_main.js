import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Modal, ModalHeader, ModalBody, Form, Label, Input, FormText } from "reactstrap";

import BackIn_Icon from "../../components/sideBarDashboard/BackInModel_Icon";
import DocIcon from "../../components/sideBarDashboard/DocIcon";
import GraphicIcon from "../../components/sideBarDashboard/GraficIcon";
import HistoryPriceIcon from "../../components/sideBarDashboard/HistoryPriceIcon";
import HomePanel_Icon from "../../components/sideBarDashboard/HomePanel_Icon";
import Map_Icon from "../../components/sideBarDashboard/Map_Icon";
import RecIcon from "../../components/sideBarDashboard/RecIcon";
import SensorsIoT from "../../components/sideBarDashboard/SensorsIoT";
import { IconButton } from "../../components/sideBarDashboard/util/IconButton";




import GantGraph from "../../components/gant/gant_component";
import SideBarDashboard from "../../components/sideBarDashboard/SideBarDashboard";



function GanttMain(props) {

    const [showModal, setModal] = useState(false);
    const [object, setObject] = useState([]);


    let iconsLeftBar = [
        new IconButton("/dashboard", "Главная панель",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/map/" + props.match.params.modelId, "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("/docs", "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("/iot", "Датчики IoT",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/recommendation", "Рекомендации",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("#nogo", "История цен",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("#/", "График работ",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/models", "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ];

    function giveParent(task) {
        setObject(task)
        setModal(true)
    }


    return <>
        <SideBarDashboard icons={iconsLeftBar} />
        <Container fluid style={{ height: "100%", padding: "0", margin: "0" }}>
            <GantGraph giveParent={giveParent} />
        </Container>
        <Modal isOpen={showModal} toggle={() => {setModal(false)}}>
            <ModalHeader>Изменить задачу</ModalHeader>
            <ModalBody>
                <Form>
                    {/*<FormGroup>
                        <div>
                        <Label>Техника</Label>
                        <Input/>
                        </div>
                    </FormGroup>*/}
                </Form>
            </ModalBody>
        </Modal>
        
    </>

}

export default GanttMain;
