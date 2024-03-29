﻿import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { Col, Container, Row } from "reactstrap/lib";
import authService from "../../components/api-authorization/AuthorizeService";
import CardForBody from "../../components/cardForBody/CardForBody";
import { ThemeContextConsumer } from "../../components/ThemeContext";
import { functionalConverter } from "../../util/functionalConverter";
import SideBarDashboard from "../../components/sideBarDashboard/SideBarDashboard";
import { IconButton } from "../../components/sideBarDashboard/util/IconButton";
import './../../pages/pages.css';
import { LoadingFragment } from "../../util/LoadingFragment";
import {ClientRoutes} from "../../util/ClientRoutes";

class Docs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            docs: [{ "name": "Отчет о рекомендации по культуре 2022", "type": "doc", "link": "https://somepath_to_doc" },
                { "name": "Отчет о плановой урожайности 2022", "type": "xls", "link": "https://somepath_to_doc" },
                { "name": "Технологическая карта 2022", "type": "doc", "link": "https://somepath_to_doc" },
                { "name": "Отчет о выполнении мероприятий 2022", "type": "xls", "link": "https://somepath_to_doc" },
                { "name": "Отчет о нарушении 2022", "type": "xls", "link": "https://somepath_to_doc" },
                { "name": "Финансовый отчет 2022", "type": "xls", "link": "https://somepath_to_doc" },
            ], loading: false,
            icons: [
                { "doc": "https://www.svgrepo.com/show/255810/doc.svg" },
                { "xls": "https://www.svgrepo.com/show/255829/xls.svg" },
                { "pdf": "https://www.svgrepo.com/show/255818/pdf.svg" },
            ]
        };
    }


    iconsSideBarDashboard = [
        new IconButton("/" + ClientRoutes.DASHBOARD + "/" + this.props.match.params.modelId , "Главная панель",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/" + ClientRoutes.MAP + "/" + this.props.match.params.modelId, "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("/" + ClientRoutes.DOCS + "/" + this.props.match.params.modelId, "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("/" + ClientRoutes.IOTPAGE + "/" + this.props.match.params.modelId, "Датчики IoT",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/" + ClientRoutes.RECOMMENDATIONS + "/" + this.props.match.params.modelId, "Рекомендации",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("/" + ClientRoutes.HISTORY_PRICE + "/" + this.props.match.params.modelId, "История цен",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("/" + ClientRoutes.GANT + "/" + this.props.match.params.modelId, "График работ",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/" + ClientRoutes.MODELS, "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ]

    docsIcons = [
        {"doc": "https://www.svgrepo.com/show/255810/doc.svg"},
        {"xls": "https://www.svgrepo.com/show/255829/xls.svg"},
        {"pdf": "https://www.svgrepo.com/show/255818/pdf.svg"},
    ]

    render() {
        let content =
            this.state.docs.map(el => {
                return (
                    <ThemeContextConsumer>
                        {context => (
                            <CardForBody styleForCard={{ width: "150px", height: "150px", cursor: "pointer", margin: "10px" }}>
                                    <Container className="text-center mt-4">
                                        <img style={{ width: "50px", height: "50px" }}
                                            src={el.type === "doc" ? "https://www.svgrepo.com/show/255810/doc.svg" : el.type === "xls" ? "https://www.svgrepo.com/show/255829/xls.svg" : "https://www.svgrepo.com/show/255818/pdf.svg"} />

                                    </Container>
                                    <h4 className={context.theme + " text-center mt-4"} style={{ color: "#fff", fontSize: "12px"}}>
                                        {el.name}
                                        {this.state.icons.doc}
                                    </h4>
                                </CardForBody>
                        )}
                    </ThemeContextConsumer>
                )
            });
        return (
            <ThemeContextConsumer>
                {context => (
                    this.state.loading
                        ? <LoadingFragment fullscreen={true} />
                        : <Container className={context.theme + "Gray d-flex justify-content-center w-100"} fluid>
                            <SideBarDashboard block={false} icons={this.iconsSideBarDashboard}></SideBarDashboard>
                            <Row className={context.theme + "Gray mt-3 ml-5 d-flex"} style={{width: "90%"}}>
                                {content}
                            </Row>
                        </Container>
                )
                }
            </ThemeContextConsumer>
        );
    }

    async GetAllTariffsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/subscriptions/get_all', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        data.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
        this.setState({ docs: data, loading: false });
    }
}

export default Docs;