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
        new IconButton("#/", "Главная панель", <HomePanel_Icon />),
        new IconButton("/map/" + this.props.match.params.modelId, "Карта", <Map_Icon />),
        new IconButton("#nogo", "Документы", <DocIcon />),
        new IconButton("#nogo", "Датчики IoT", <SensorsIoT />),
        new IconButton("/recom", "Рекомендации", <RecIcon />),
        new IconButton("#nogo", "История цен", <HistoryPriceIcon />),
        new IconButton("#nogo", "График работ", <GraphicIcon />),
        new IconButton("/models", "Вернуться к выбору модели", <BackIn_Icon />)
    ];



    render() {
        return (
            <>
                <SideBarDashboard icons={this.iconsLeftBar} />
            </>
        )
    }
}