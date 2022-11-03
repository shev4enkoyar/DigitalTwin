import React, { Component } from "react";
import authService from "../../components/api-authorization/AuthorizeService";
import BackIn_Icon from "../../components/sideBarDashboard/BackInModel_Icon";
import DocIcon from "../../components/sideBarDashboard/DocIcon";
import GraphicIcon from "../../components/sideBarDashboard/GraficIcon";
import HistoryPriceIcon from "../../components/sideBarDashboard/HistoryPriceIcon";
import HomePanel_Icon from "../../components/sideBarDashboard/HomePanel_Icon";
import Map_Icon from "../../components/sideBarDashboard/Map_Icon";
import RecIcon from "../../components/sideBarDashboard/RecIcon";
import SensorsIoT from "../../components/sideBarDashboard/SensorsIoT";
import SideBarDashboard from "../../components/sideBarDashboard/SideBarDashboard";
import { IconButton } from "../../components/sideBarDashboard/util/IconButton";
import SignalRContainer from "./SignalRContainer";
import {LoadingFragment} from "../../util/LoadingFragment";

class MapMain extends Component {

    constructor(props) {
        super(props);
        this.state = { mapId: -1, loading: true };
    }
    iconsSideBarDashboard = [
        new IconButton("/dashboard/" + this.props.match.params.modelId, "Главная панель",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/map/" + this.props.match.params.modelId, "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("#nogo", "Документы", 
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
    ]

    componentDidMount() {
        this.GetMapId();
    }

    render() {
        return (
            this.state.loading
                ?
                <LoadingFragment/>
                :
                <div style={{ height: "100%" }}>
                    <SideBarDashboard block={false} icons={this.iconsSideBarDashboard}></SideBarDashboard>
                    <SignalRContainer mapId={this.state.mapId} />
                </div>

        );
    }


    async GetMapId() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/techcard/get_all', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        let mapIdTemp = -1;
        let currentId = parseInt(this.props.match.params.modelId);
        data.forEach(el => {
            if (el.id === currentId)
                mapIdTemp = el.mapId;
        })
        if (mapIdTemp === -1)
            alert("Данные о карте не найдены");
        this.setState({ mapId: mapIdTemp, loading: false });
    }
}

export default MapMain;