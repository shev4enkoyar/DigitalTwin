import React, {useState} from "react";
import SignalRContainer from "./SignalRContainer";
import {IconButton} from "../../components/classForDataBase";
import HomePanel_Icon from "../../components/SideBarDashboard/HomePanel_Icon";
import Map_Icon from "../../components/SideBarDashboard/Map_Icon";
import DocIcon from "../../components/SideBarDashboard/DocIcon";
import SensorsIoT from "../../components/SideBarDashboard/SensorsIoT";
import RecIcon from "../../components/SideBarDashboard/RecIcon";
import HistoryPriceIcon from "../../components/SideBarDashboard/HistoryPriceIcon";
import GraphicIcon from "../../components/SideBarDashboard/GraficIcon";
import BackIn_Icon from "../../components/SideBarDashboard/BackInModel_Icon";
import SideBarDashboard from "../../components/SideBarDashboard/SideBarDashboard";

const MapMain = (props) => {

    const iconsSideBarDashboard = [
        new IconButton("#/", "Главная панель", <HomePanel_Icon />),
        new IconButton("/map", "Карта", <Map_Icon />),
        new IconButton("#nogo", "Документы", <DocIcon/>),
        new IconButton("#nogo", "Датчики IoT", <SensorsIoT />),
        new IconButton("/recom", "Рекомендации", <RecIcon/>),
        new IconButton("#nogo", "История цен", <HistoryPriceIcon/>),
        new IconButton("#nogo", "График работ", <GraphicIcon/>),
        new IconButton("/models", "Вернуться к выбору модели", <BackIn_Icon />)
    ]

    return (
        <div>
            <SideBarDashboard block={false} icons={iconsSideBarDashboard}></SideBarDashboard>
            <SignalRContainer mapId={1}/>
        </div>

    );
}

export default MapMain;