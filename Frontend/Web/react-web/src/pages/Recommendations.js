import React, { Component} from 'react';
import CardForBody from './../components/cardForBody/CardForBody';
import HeaderForDashboard from './../components/Header/HeaderForDasnboard/HeaderForDashboard';
import SideBarDashboard from './../components/sideBarDashboard/SideBarDashboard';
import './pages.css';
import { IconButton } from '../components/classForDataBase';
import BackIn_Icon from '../components/sideBarDashboard/BackInModel_Icon';
import Map_Icon from '../components/sideBarDashboard/Map_Icon';
import SensorsIoT from '../components/sideBarDashboard/SensorsIoT';
import HomePanel_Icon from '../components/sideBarDashboard/HomePanel_Icon';
import { ThemeContextConsumer } from './../components/ThemeContext';
import DocIcon from '../components/sideBarDashboard/DocIcon';
import GraphicIcon from '../components/sideBarDashboard/GraficIcon';
import HistoryPriceIcon from '../components/sideBarDashboard/HistoryPriceIcon';
import RecIcon from '../components/sideBarDashboard/RecIcon';
import TableForTariffs from '../components/tableForTariffs/TableForTariffs.js';
class Recommendations extends Component {
    iconsLeftBar = [
        new IconButton("#/", "Главная панель", <HomePanel_Icon />),
        new IconButton("/map", "Карта", <Map_Icon />),
        new IconButton("#nogo", "Документы", <DocIcon />),
        new IconButton("#nogo", "Датчики IoT", <SensorsIoT />),
        new IconButton("/recom", "Рекомендации", <RecIcon />),
        new IconButton("#nogo", "История цен", <HistoryPriceIcon />),
        new IconButton("#nogo", "График работ", <GraphicIcon />),
        new IconButton("/models", "Вернуться к выбору модели", <BackIn_Icon />)
    ];
    hRecommend = ['#','Дата', 'Объект','Прогнозируемое событие','Рекомендация'];
    recommend = [
    {
        num: "1",
        date: new Date(2020, 4, 7).toLocaleDateString(),
        obj: "Пшеница",
        progEv: "Кратковременная засуха",
        rec:"Осуществить дополнительный полив",
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
    ];
    render() {
        return (
            <>
                <ThemeContextConsumer>{context => (
                    <div className={context.theme+"Gray "+"bodyStyle"}>
                        <HeaderForDashboard />
                        <CardForBody>
                            <TableForTariffs classNamesTD="recTabl" textForTable="Рекомендации" contentsForTable={this.recommend} headersForTable={this.hRecommend} />
                        </CardForBody>
                        <SideBarDashboard icons={this.iconsLeftBar} />
                    </div>
                )}
                </ThemeContextConsumer>
        </>
        );
    }
} export default Recommendations;