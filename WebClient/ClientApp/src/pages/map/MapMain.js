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

class MapMain extends Component {

    constructor(props) {
        super(props);
        this.state = { mapId: -1, loading: true };
    }
    iconsSideBarDashboard = [
        new IconButton("/dashboard/" + this.props.match.params.modelId, "Главная панель", <HomePanel_Icon />),
        new IconButton("/map/" + this.props.match.params.modelId, "Карта", <Map_Icon />),
        new IconButton("#nogo", "Документы", <DocIcon />),
        new IconButton("#nogo", "Датчики IoT", <SensorsIoT />),
        new IconButton("/recom", "Рекомендации", <RecIcon />),
        new IconButton("#nogo", "История цен", <HistoryPriceIcon />),
        new IconButton("#nogo", "График работ", <GraphicIcon />),
        new IconButton("/models", "Вернуться к выбору модели", <BackIn_Icon />)
    ]

    componentDidMount() {
        this.GetMapId();
    }

    render() {
        return (
            this.state.loading
                ?
                <p><em>Loading...</em></p>
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