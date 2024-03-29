import React, { Component, useEffect, useState } from "react";
import { Gantt, Task, EventOption } from 'gantt-task-react';
import { Col, Container, Row } from "reactstrap/lib";
import authService from "../components/api-authorization/AuthorizeService";
import CardForBody from "../components/cardForBody/CardForBody";
import { ThemeContextConsumer } from "../components/ThemeContext";
import BackIn_Icon from "../components/sideBarDashboard/BackInModel_Icon";
import DocIcon from "../components/sideBarDashboard/DocIcon";
import GraphicIcon from "../components/sideBarDashboard/GraficIcon";
import HistoryPriceIcon from "../components/sideBarDashboard/HistoryPriceIcon";
import HomePanel_Icon from "../components/sideBarDashboard/HomePanel_Icon";
import Map_Icon from "../components/sideBarDashboard/Map_Icon";
import RecIcon from "../components/sideBarDashboard/RecIcon";
import SensorsIoT from "../components/sideBarDashboard/SensorsIoT";
import SideBarDashboard from "../components/sideBarDashboard/SideBarDashboard";
import { IconButton } from "../components/sideBarDashboard/util/IconButton";
import { DashboardClassic } from "./DashboardClassic.js";
import { NavLink } from 'react-router-dom';
import { withRouter, WithRouter } from 'react-router';
import './Dashboard.css';
import "../components/gant/style-tasks.css";
import GanttMain from "./gant/gant_main";
import {ClientRoutes} from "../util/ClientRoutes";

const StatusCard = (props) => {
    return (
        <Col lg={3} md={6} className="d-flex justify-content-center p-0">
            <CardForBody styleForCard={{ width: "100%", padding: "5px" }}>
                <Row>
                    <Col xs={8} className="pr-0">
                        {props.children}
                    </Col>
                    <Col xs={4} className="align-items-center">
                        <NavLink to={props.path}>
                            <Container style={{ backgroundColor: `${props.color}` }} className="iconbox">
                                <img style={{ width: "30px", height: "30px" }} className="icon"
                                    src={props.iconpath} />
                            </Container>
                        </NavLink>
                    </Col>
                </Row>
            </CardForBody>
        </Col>
        )
}

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classis: false,
            tasks_data: [],
            model_status: {
                "text": "", "color": ""
            },
            iot_status: {
                "text": "", "color": ""
            },
            recommendation: {
                "text": "", "color": ""
            },
            price: {
                "prev": "", "current": "", "color": ""
            }
        }

    }

    componentDidMount() {
        this.GetTasks();
        this.GetIoTs();
        this.GetRecommendations();
        this.GetPriceDiff();
    }

    async GetTasks() {
        const token = await authService.getAccessToken();
        const response = await fetch(`api/task/get_all/${this.props.match.params.modelId}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        let tasks = []
        let status = {}
        let statuses = []
        for (let one of data) {
            let task = {}
            task.task = one.name
            if (new Date(one.endDate).getTime() < Date.now()) {
                task.color = "green"
            } else {
                task.color = "yellow"
            }
            task.date = one.endDate
            tasks.push(task)
            if (!one.isComplete) {
                statuses.push(one.name)
            }
        }
        if (statuses.length > 1) {
            status.text = `Работ в процеесе выполнения - ${statuses.length}`
            status.color = "orange"
        } else if (statuses.length == 1) {
            status.text = `Выполняется работа "${statuses[0]}"`
            status.color = "orange"
        } else {
            status.text = "Активных работ нет"
            status.color = "green"
        }
        this.setState({ tasks_data: tasks, model_status: status });
    }

    async GetIoTs() {
        const token = await authService.getAccessToken();
        const response = await fetch(`api/sensor/get_all/${this.props.match.params.modelId}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        let off = 0
        let status = {}
        if (data.length > 0) {
            for (let iot of data) {
                if (!iot.isEnabled) {
                    off += 1
                }
            }
            if (off > 0) {
                status.text = `Потеряна связь с ${off} датчиками`
                status.color = "orange"
            } else {
                status.text = "Все датчики в норме"
                status.color = "green"
            }
        } else {
            status.text = "Нет данных"
        }
        this.setState({ iot_status: status});
    }

    async GetRecommendations() {
        const token = await authService.getAccessToken();
        const response = await fetch(`api/recommendation/get_all/${this.props.match.params.modelId}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        let status = {}
        if (data.length > 0) {
            status.text = data[data.length - 1].recommendationText
        } else {
        status.text = "Нет рекомендаций"}
        this.setState({ recommendation: status });
    }

    async GetPriceDiff() {
        const token = await authService.getAccessToken();
        const response = await fetch(`api/products/get_product_histories/${this.props.match.params.modelId}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        let status = {}
        if (data.length > 1) {
            status.prev = data[data.length - 2].price
            status.current = data[data.length - 1].price
        } else {
            status.text = "Нет данных"
        }
        this.setState({ price: status });
    }


    iconsLeftBar = [
        new IconButton("/" + ClientRoutes.DASHBOARD + "/" + this.props.match.params.modelId, "Главная панель", 
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
    ];



    render() {
        const { modelId } = this.props.match.params;
        let tasks =
            this.state.tasks_data.map(el => {
                return (
                    <Row>
                        <Col xs={3} className="centered">
                            <div id="circle" className="my-auto" style={{ backgroundColor: el.color }}></div>
                        </Col>
                        <Col>
                            <p style={{ marginTop: "16px" }}>{el.task}</p>
                            <p className="ago">{el.date}</p>
                        </Col>
                    </Row>
                )
            });
        return (
            <>
                <ThemeContextConsumer>
                    {context => (
                        <Container className={context.theme + "Gray d-flex justify-content-center w-100"} style={{fontFamily: "Bitter"}} fluid>
                            <SideBarDashboard icons={this.iconsLeftBar}></SideBarDashboard>
                            <Container fluid>
                                <Row className={context.theme + "Gray mt-3 ml-5 d-flex"} style={{ width: "90%" }}>
                                    <Col><h2 style={{ color: "white" }} className={context.theme + "Gray "}>Технологическая карта поля {modelId}</h2></Col>
                                    <Col xs={3} className="text-right">
                                        <input type="checkbox" id="iostoggle" style={{ marginTop: "10px" }} onClick={(e) => { this.setState({classic: !this.state.classic}, console.log(this.state.classic))}}/>
                                        <label for="iostoggle" style={{ color: "white" }} className={context.theme +"Gray " }>Классический вид</label>
                                    </Col>
                                </Row>
                                {this.state.classic ? <DashboardClassic modelId={modelId}/> :
                                    <Container fluid>
                                        <Row className={context.theme + "Gray mt-3 ml-5 d-flex"} style={{ width: "90%" }}>
                                            <StatusCard color={"blue"} iconpath={"https://www.svgrepo.com/show/38692/monitor.svg"} path={"/" + ClientRoutes.GANT + "/" + this.props.match.params.modelId}>
                                                <p>Статус модели</p>
                                                <p className="ptext" style={{ color: this.state.model_status.color }}>{this.state.model_status.text}</p>
                                            </StatusCard>
                                            <StatusCard color={"red"} iconpath={"https://www.svgrepo.com/show/70590/aim.svg"} path={"/" + ClientRoutes.IOTPAGE + "/" + this.props.match.params.modelId}>
                                                <p >Статус датчиков</p>
                                                <p className="ptext" style={{ color: this.state.iot_status.color }}>{this.state.iot_status.text}</p>
                                            </StatusCard>
                                            <StatusCard color={"orange"} iconpath={"https://www.svgrepo.com/show/16380/edit.svg"} path={"/" + ClientRoutes.RECOMMENDATIONS + "/" + this.props.match.params.modelId}>
                                                <p >Текущая рекомендация</p>
                                                <p className="ptext" style={{ color: this.state.recommendation.color }}>{this.state.recommendation.text}</p>
                                            </StatusCard>
                                            <StatusCard color={"green"} iconpath={"https://www.svgrepo.com/show/40868/rub-symbol.svg"} path={"/" + ClientRoutes.HISTORY_PRICE + "/" + this.props.match.params.modelId}>
                                                <p >Изменение цены за сутки</p>
                                                {this.state.price.prev && this.state.price.current ? <p className="ptext" style={{ color: this.state.price.color }}>{this.state.price.prev} &#8594; {this.state.price.current}</p> :
                                                    <p className="ptext" style={{ color: this.state.price.color }}>{this.state.price.text}</p>
                                                }
                                            </StatusCard>
                                        </Row>
                                        <Row className={context.theme + "Gray mt-3 ml-5"} style={{ width: "90%" }}>
                                            <Col md={6} lg={9} style={{ height: "60vh" }} className="ml-0 mb-3 d-none d-lg-flex">
                                                <CardForBody styleForCard={{ width: "100%", height: "100%", margin: "0", padding: "0" }}>
                                                    <h3>График работ</h3>
                                                    <GanttMain height={"no"} />
                                                </CardForBody>
                                            </Col>
                                            <Col md={6} lg={3} style={{ height: "60vh" }} className="mr-0 mb-3">
                                                <CardForBody styleForCard={{ width: "100%", height: "100%", margin: "0" }}>
                                                    <h3 className="events">Прошедие события</h3>
                                                    {tasks}
                                                </CardForBody>
                                            </Col>
                                        </Row>
                                    </Container>}
                                </Container>
                            </Container>
                    )
                    }
                </ThemeContextConsumer>
            </>
        )
    }
}