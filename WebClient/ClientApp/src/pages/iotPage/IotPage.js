import React, { Component } from 'react';
import { Col, Container, Row } from "reactstrap";
import CardForBody from '../../components/cardForBody/CardForBody';
import Input from '../../components/input/Input';
import SideBarDashboard from "../../components/sideBarDashboard/SideBarDashboard";
import { IconButton } from "../../components/sideBarDashboard/util/IconButton";
import { ThemeContextConsumer } from "../../components/ThemeContext";
import '../pages.css';
class IotPage extends Component {
    iconsLeftBar = [
        new IconButton("#/", "Главная панель",
            <img style={{ width: "25px", height: "25px", margin:"7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/map/" + this.props.match.params.modelId, "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("/docs", "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("#nogo", "Датчики IoT",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/recom", "Рекомендации",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("#nogo", "История цен",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("#nogo", "График работ",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/models", "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ];
    render() {


        return (
            <ThemeContextConsumer>{
                context => (
                    <>
                        <SideBarDashboard icons={this.iconsLeftBar} />
                        <Container className={context.theme + "Gray " + "p-0 flex-wrap position-absolute d-flex "} style={{ width: '86%', marginLeft: '11%', marginRight:'3%' }}>
                            <Row className="h-100 w-100 m-0 flex-column">
                                <Col className="col-md-6 col d-flex">
                                    <CardForBody styleForCard={{ minWidth: '100%' }} classForContB="d-flex flex-column align-items-center" styleTextForCard={{ padding: '5%', minWidth: '100%' }}>
                                        <h5 style={{ fontFamily: 'Bitter', margin: '10px 0px 30px 0px' }} className="d-flex text-center">
                                            Подключить новый сенсор
                                        </h5>
                                        <Input classNameP="textForSign16" className="input" Label="Псевдоним устройства"></Input>
                                        <button className="btn btn-primary mt-4" style={{ width: "190px" }}>
                                            Подключить
                                        </button>
                                    </CardForBody>
                                </Col>
                            </Row>
                        </Container>
            </>
                )
            }
            </ThemeContextConsumer>
        );
    }
} export default IotPage;