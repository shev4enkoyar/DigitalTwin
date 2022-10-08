import React, { Component } from 'react';
import './pages.css';
import HeaderForDashboard from '../components/Header/HeaderForDasnboard/HeaderForDashboard';
import { ThemeContextConsumer } from "../components/ThemeContext";
import SideBarDashboard from '../components/sideBarDashboard/SideBarDashboard.js';
import HomePanel_Icon from './../components/sideBarDashboard/HomePanel_Icon';
import Map_Icon from './../components/sideBarDashboard/Map_Icon';
import SensorsIoT from './../components/sideBarDashboard/SensorsIoT';
import BackIn_Icon from './../components/sideBarDashboard/BackInModel_Icon';
import { IconButton } from './../components/classForDataBase';
import ContentDashboard from './../components/contentDashboard/ContentDashboard';
import { useLocation } from 'react-router';
import { Container } from 'react-bootstrap';
import TransportSelect from './Modal/transportSelect/TransportSelect';
class DashboardEmpty extends Component{
    constructor(props){
        super(props);
        this.state = { isActive:false };
    }
    handleActiveChanged = () => {
        let prev = this.state.isActive;
        this.setState({ isActive: !(prev) });
        console.log(this.state);
    }
    isInherit = this.props.location.state ? (this.props.location.state.isInherit == 1? true:false) :true
    icons =
        [
            new IconButton("#/", "Главная панель", <HomePanel_Icon />),
            new IconButton("/map", "Карта", <Map_Icon />),
            new IconButton("#nogo", "Датчики IoT", <SensorsIoT />),
            new IconButton("/models", "Вернуться к выбору модели", <BackIn_Icon />),
        ]
    render(props)
    { 
        return(
            <>
                <ThemeContextConsumer>
                    {context =>
                    (
                        <Container className={context.theme + "Gray " + "mainContainer"} style={{ display: 'flex', flexDirection: 'row', padding: '0px', background: "#262626", height: "max-content", minHeight:"100%" }}>
                            <TransportSelect isActive={this.state.isActive} handleActiveChanged={this.handleActiveChanged}/>
                            <HeaderForDashboard />
                            <ContentDashboard isInherit={this.isInherit} handleActiveChanged={this.handleActiveChanged}/>
                            <SideBarDashboard icons={this.icons} />
                        </Container>
                    )
                    }
                </ThemeContextConsumer>
            </>
        );
    }
}
const Dash = (props) => {
    const location = useLocation()
    return (<DashboardEmpty location={location} {...props} />)
}; export default Dash;