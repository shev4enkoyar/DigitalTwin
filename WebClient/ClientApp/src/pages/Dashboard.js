import {Component} from "react";
import React from "react";
import SideBarDashboard from "../components/sideBarDashboard/SideBarDashboard";
import {IconButton} from "../components/sideBarDashboard/util/IconButton";
import HomePanel_Icon from "../components/sideBarDashboard/HomePanel_Icon";
import Map_Icon from "../components/sideBarDashboard/Map_Icon";
import DocIcon from "../components/sideBarDashboard/DocIcon";
import SensorsIoT from "../components/sideBarDashboard/SensorsIoT";
import RecIcon from "../components/sideBarDashboard/RecIcon";
import HistoryPriceIcon from "../components/sideBarDashboard/HistoryPriceIcon";
import GraphicIcon from "../components/sideBarDashboard/GraficIcon";
import BackIn_Icon from "../components/sideBarDashboard/BackInModel_Icon";
export class Dashboard extends Component {



    iconsLeftBar = [
        new IconButton("#/", "Главная панель", <HomePanel_Icon />),
        new IconButton( "/map/" + this.props.match.params.modelId  , "Карта", <Map_Icon />),
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