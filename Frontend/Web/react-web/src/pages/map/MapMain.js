import React, {useState} from "react";
import SignalRContainer from "./SignalRContainer";
import {IconButton} from "../../components/classForDataBase";
import HomePanel_Icon from "../../components/SideBar/HomePanel_Icon";
import Map_Icon from "../../components/SideBar/Map_Icon";
import DocIcon from "../../components/SideBar/DocIcon";
import SensorsIoT from "../../components/SideBar/SensorsIoT";
import RecIcon from "../../components/SideBar/RecIcon";
import HistoryPriceIcon from "../../components/SideBar/HistoryPriceIcon";
import GraphicIcon from "../../components/SideBar/GraficIcon";
import BackIn_Icon from "../../components/SideBar/BackInModel_Icon";
import SideBar from "../../components/SideBar/SideBar";

const MapMain = (props) => {

    const iconsSideBar = [
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
            <SideBar block={false} icons={iconsSideBar}></SideBar>
            <SignalRContainer mapId={1}/>
        </div>

    );
}

export default MapMain;