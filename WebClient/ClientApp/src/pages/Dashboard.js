import React, { Component } from "react";
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
export class Dashboard extends Component {



    iconsLeftBar = [
        new IconButton("#/", "Главная панель", 
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/map/" + this.props.match.params.modelId, "Карта", 
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("/docs", "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("/iot", "Датчики IoT", 
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/recom", "Рекомендации", 
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("#nogo", "История цен", 
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("#nogo", "График работ", 
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/models", "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ];



    render() {
        return (
            <>
                <SideBarDashboard icons={this.iconsLeftBar} />
            </>
        )
    }
}