import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Container } from "reactstrap";
import { IconButton } from "../components/sideBarDashboard/util/IconButton";
import CardForBody from './../components/cardForBody/CardForBody';
import SideBarDashboard from './../components/sideBarDashboard/SideBarDashboard';
import { ThemeContextConsumer } from './../components/ThemeContext';
import authService from "../components/api-authorization/AuthorizeService";
import './pages.css';
import {ClientRoutes} from "../util/ClientRoutes";
class Recommendations extends Component {
    iconsLeftBar = [
        new IconButton("/" + ClientRoutes.DASHBOARD + "/" + this.props.match.params.modelId, "Главная панель",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/" + ClientRoutes.MAP + "/" + this.props.match.params.modelId, "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("/" + ClientRoutes.DOCS + "/" + this.props.match.params.modelId, "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("/" + ClientRoutes.IOTPAGE + "/" + this.props.match.params.modelId, "Датчики IoT",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/" + ClientRoutes.RECOMMENDATIONS + "/" + this.props.match.params.modelId, "Рекомендации",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("/" + ClientRoutes.HISTORY_PRICE + "/" + this.props.match.params.modelId, "История цен",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("/" + ClientRoutes.GANT + "/" + this.props.match.params.modelId, "График работ",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/" + ClientRoutes.MODELS, "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ];
    constructor(props) {
        super(props);
        this.state = { recs: [] };
    }
    handleSelectRec = (value) => {
        const prev = this.state;
        this.setState({ ...prev, recs:[...value] })
    }
    GetProducts = async () => {
        try {
            const modelId = this.props.match.params.modelId;
            console.log(modelId);
            const token = await authService.getAccessToken();
            const response = await fetch(`api/recommendation/get_all/${modelId}`, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            //console.log(data);
            //let recTemp = [];
            ////transpTemp.add();
            //data.forEach(el => recTemp.add(el.name));
            this.handleSelectRec(data);

        }
        catch (e) {
            console.log(e)
        }
    }
    componentDidMount() {
        this.GetProducts();
    }
    hRecommend = [
        {
            dataField: 'id',
            text: '#'
        },
        {
            dataField: 'createDate',
            text: 'Дата'
        },
        {
            dataField: 'forecastEventText',
            text: 'Прогнозируемое событие'
        }
        ,
        {
            dataField: 'recommendationText',
            text: 'Рекомендация'
        }
    ];
    recommend = [
        {
            num: "1",
            date: new Date(2020, 4, 7).toLocaleDateString(),
            obj: "Пшеница",
            progEv: "Кратковременная засуха",
            rec: "Осуществить дополнительный полив",
        },
        {
            num: "2",
            date: new Date(2020, 7, 21).toLocaleDateString(),
            obj: "Пшеница",
            progEv: "Умеренные дожди",
            rec: "Не производить плановый полив",
        },
        {
            num: "3",
            date: new Date(2020, 11, 12).toLocaleDateString(),
            obj: "Пшеница",
            progEv: "Град",
            rec: "Накрыть культуры плотными материалами",
        },
        {
            num: "4",
            date: new Date(2021, 1, 30).toLocaleDateString(),
            obj: "Пшеница",
            progEv: "Кратковременная засуха",
            rec: "Осуществить дополнительный полив",
        },
        {
            num: "5",
            date: new Date(2021, 4, 25).toLocaleDateString(),
            obj: "Пшеница",
            progEv: "Кратковременная засуха",
            rec: "Осуществить дополнительный полив",
        },
        {
            num: "6",
            date: new Date(2021, 9, 28).toLocaleDateString(),
            obj: "Пшеница",
            progEv: "Гроза",
            rec: "Накрыть культуры плотными материалами",
        },
        {
            num: "7",
            date: new Date(2022, 0, 22).toLocaleDateString(),
            obj: "Пшеница",
            progEv: "Гроза",
            rec: "Накрыть культуры плотными материалами",
        },
        {
            num: "8",
            date: new Date(2022, 4, 13).toLocaleDateString(),
            obj: "Пшеница",
            progEv: "Умеренные дожди",
            rec: "Не производить плановый полив",
        }
    ]
    render() {
        return (
            <ThemeContextConsumer>{context => (
                <div style={{ overflow: "auto" }}>
                    <SideBarDashboard icons={this.iconsLeftBar} />
                    <CardForBody styleForCard={{ position: 'relative', padding: '3%', margin: '5% 10% 0% 15%' }} styleTextForCard={{ padding: '0px' }}>
                        <Container className="ContForHistoryTariff p-0 contForReactTable">
                            <BootstrapTable classes="HistoryTableText" keyField='num' data={this.state.recs} columns={this.hRecommend} />
                        </Container>
                    </CardForBody>
                </div>
            )}
            </ThemeContextConsumer>
        );
    }
} export default Recommendations;