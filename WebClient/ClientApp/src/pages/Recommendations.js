import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Container } from "reactstrap";
import { IconButton } from "../components/sideBarDashboard/util/IconButton";
import CardForBody from './../components/cardForBody/CardForBody';
import SideBarDashboard from './../components/sideBarDashboard/SideBarDashboard';
import { ThemeContextConsumer } from './../components/ThemeContext';
import './pages.css';
class Recommendations extends Component {
    iconsLeftBar = [
        new IconButton("#/", "Главная панель",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/map", "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("#nogo", "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("#nogo", "Датчики IoT",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/recommendation", "Рекомендации",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px"  }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("#nogo", "История цен",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("#nogo", "График работ",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/models", "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ];
    hRecommend = [
        {
            dataField: 'num',
            text: '#'
        },
        {
            dataField: 'date',
            text: 'Дата'
        },
        {
            dataField: 'obj',
            text: 'Объект'
        },
        {
            dataField: 'progEv',
            text: 'Прогнозируемое событие'
        }
        ,
        {
            dataField: 'rec',
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
                            <BootstrapTable classes="HistoryTableText" keyField='num' data={this.recommend} columns={this.hRecommend} />

                            {/*<Table style={{color: "#fff", background: "#212026"}} >*/}
                            {/*    <thead>*/}
                            {/*    <tr>*/}
                            {/*        <th>{this.hRecommend.at(0)}</th>*/}
                            {/*        <th>{this.hRecommend.at(1)}</th>*/}
                            {/*        <th>{this.hRecommend.at(2)}</th>*/}
                            {/*        <th>{this.hRecommend.at(3)}</th>*/}
                            {/*        <th>{this.hRecommend.at(4)}</th>*/}
                            {/*    </tr>*/}
                            {/*    </thead>*/}
                            {/*    <tbody>*/}
                            {/*        {*/}
                            {/*            this.recommend.map(el =>*/}
                            {/*                <tr>*/}
                            {/*                    <td>{el.num}</td>*/}
                            {/*                    <td>{el.date}</td>*/}
                            {/*                    <td>{el.obj}</td>*/}
                            {/*                    <td>{el.progEv}</td>*/}
                            {/*                    <td>{el.rec}</td>*/}
                            {/*                </tr>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    </tbody>*/}
                            {/*</Table>*/}
                            {/*<TableForTariffs classNameTab="margTable" classNamesTD="ForBox" textForTable="Рекомендации" contentsForTable={this.recommend} headersForTable={this.hRecommend} />*/}
                        </Container>
                    </CardForBody>
                </div>
            )}
            </ThemeContextConsumer>
        );
    }
} export default Recommendations;