import React, { Component } from 'react';
import './pages.css';
import { Container } from 'react-bootstrap';
import HeaderForDashboard from '../components/Header/HeaderForDasnboard/HeaderForDashboard';
import { ThemeContextConsumer } from "../components/ThemeContext";
import SideBar from '../components/SideBar/SideBar.js';
import HomePanel_Icon from './../components/SideBar/HomePanel_Icon';
import Map_Icon from './../components/SideBar/Map_Icon';
import SensorsIoT from './../components/SideBar/SensorsIoT';
import BackIn_Icon from './../components/SideBar/BackInModel_Icon';
import { IconButton } from './../components/classForDataBase';
import ContentDashboard from './../components/ContentDashboard/ContentDashboard';
class DashbordEmpty extends Component {
    icons =
        [
            new IconButton("#/", "Главная панель", <HomePanel_Icon />),
            new IconButton("/map", "Карта", <Map_Icon />),
            new IconButton("#nogo", "Датчики IoT", <SensorsIoT />),
            new IconButton("/models", "Вернуться к выбору модели", <BackIn_Icon />)
        ]
    render() {

        return (<>
            <ThemeContextConsumer>{context => (
                    
                    <div className={context.theme + "Gray " + "body_style"} style={{
                    display: 'flex', flexDirection: 'row', padding: '0px'
                }}>
                    <Container style={{
                        display: 'flex', flexDirection: 'column', padding: '0px', margin: '0px',
                        width: '100%',
                        position: 'inherit',
                        right: '0px'
                    }}>
                        <HeaderForDashboard />
                        <ContentDashboard />
                    </Container>
                    <SideBar icons={this.icons} />
                </div>)}
            </ThemeContextConsumer>
           
        </>
        );
    }
} export default DashbordEmpty;