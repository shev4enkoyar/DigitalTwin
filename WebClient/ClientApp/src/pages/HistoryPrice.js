import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Container } from "reactstrap";
import { IconButton } from "../components/sideBarDashboard/util/IconButton";
import CardForBody from './../components/cardForBody/CardForBody';
import SideBarDashboard from './../components/sideBarDashboard/SideBarDashboard';
import { ThemeContextConsumer } from './../components/ThemeContext';
import './pages.css';
import { ClientRoutes } from "../util/ClientRoutes";
class HistoryPrice extends Component {
    iconsLeftBar = [
        new IconButton("#/", "Главная панель",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/" + ClientRoutes.MAP + "/" + this.props.match.params.modelId, "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("/" + ClientRoutes.DOCS + "/" + this.props.match.params.modelId, "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("/" + ClientRoutes.IOTPAGE + "/" + this.props.match.params.modelId, "Датчики IoT",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/" + ClientRoutes.RECOMMENDATIONS + "/" + this.props.match.params.modelId, "Рекомендации",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("/" + ClientRoutes.HISTORY_PRICE + "/" + this.props.match.params.modelId, "История цен",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("/" + ClientRoutes.GANT + "/" + this.props.match.params.modelId, "График работ",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/" + ClientRoutes.MODELS, "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ];
    
    render() {
        return (
            <ThemeContextConsumer>{context => (
                <div style={{ overflow: "auto" }}>
                    <SideBarDashboard icons={this.iconsLeftBar} />
                    <CardForBody styleForCard={{ position: 'relative', padding: '3%', margin: '5% 10% 0% 15%' }} styleTextForCard={{ padding: '0px' }}>
                        <Container className="ContForHistoryTariff p-0 contForReactTable">
                            
                          </Container>
                    </CardForBody>
                </div>
            )}
            </ThemeContextConsumer>
        );
    }
} export default HistoryPrice;