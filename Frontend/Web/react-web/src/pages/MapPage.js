import React, { Component, useState} from 'react';
import { Container } from 'react-bootstrap';
import SideBar from '../components/SideBar/SideBar';
import MapPanel from '../components/MapPanel/MapPanel';
import './pages.css';
import { IconButton } from '../components/classForDataBase';
import BackIn_Icon from '../components/SideBar/BackInModel_Icon';
import Map_Icon from '../components/SideBar/Map_Icon';
import SensorsIoT from '../components/SideBar/SensorsIoT';
import HomePanel_Icon from '../components/SideBar/HomePanel_Icon';
import { ThemeContextConsumer } from './../components/ThemeContext';
import DocIcon from '../components/SideBar/DocIcon';
import GraphicIcon from '../components/SideBar/GraficIcon';
import HistoryPriceIcon from '../components/SideBar/HistoryPriceIcon';
import RecIcon from '../components/SideBar/RecIcon';
class MapPage extends Component { 
    iconsLeftBar = [
        new IconButton("#/", "Главная панель", <HomePanel_Icon />),
        new IconButton("/mapPage", "Карта", <Map_Icon />),
        new IconButton("#nogo", "Документы", <DocIcon/>),
        new IconButton("#nogo", "Датчики IoT", <SensorsIoT />),
        new IconButton("/recom", "Рекомендации", <RecIcon/>),
        new IconButton("#nogo", "История цен", <HistoryPriceIcon/>),
        new IconButton("#nogo", "График работ", <GraphicIcon/>),
        new IconButton("/models", "Вернуться к выбору модели", <BackIn_Icon />)
    ]
    iconsRightBar = [
        new IconButton("#nogo", "Культура", <BackIn_Icon />),
        new IconButton("#nogo", "Метостанция", <BackIn_Icon />),
        new IconButton("#nogo", "IoT", <BackIn_Icon />)
]
    render() {
        
        return (<>
            <ThemeContextConsumer>{context => (
                <div style={{ height: '100%' }}>

        <MapPanel/>
        <Container className="contSide">
        <SideBar block={false} icons={this.iconsLeftBar}></SideBar>
                        <SideBar alt={true} block={false} color="gray" icons={this.iconsRightBar}/>
            </Container> </div>)}</ThemeContextConsumer>
        </>
        );
    }
} export default MapPage;