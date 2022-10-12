import React from "react";
import SignalRContainer from "./SignalRContainer";
import HomePanel_Icon from "../../components/sideBarDashboard/HomePanel_Icon";
import Map_Icon from "../../components/sideBarDashboard/Map_Icon";
import DocIcon from "../../components/sideBarDashboard/DocIcon";
import SensorsIoT from "../../components/sideBarDashboard/SensorsIoT";
import RecIcon from "../../components/sideBarDashboard/RecIcon";
import HistoryPriceIcon from "../../components/sideBarDashboard/HistoryPriceIcon";
import GraphicIcon from "../../components/sideBarDashboard/GraficIcon";
import BackIn_Icon from "../../components/sideBarDashboard/BackInModel_Icon";
import SideBarDashboard from "../../components/sideBarDashboard/SideBarDashboard";
import {IconButton} from "../../components/sideBarDashboard/util/IconButton";

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
        <div style={{height: "100%"}}>
            <SideBarDashboard block={false} icons={iconsSideBarDashboard}></SideBarDashboard>
            <SignalRContainer mapId={1}/>
        </div>

    );
}

export default MapMain;