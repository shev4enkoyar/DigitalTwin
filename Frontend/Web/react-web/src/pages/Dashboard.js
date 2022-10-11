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
import { Link } from "react-router-dom";
import plus from './../components/data/plusForButtonAdding.svg';
import ButtonEdit from './../components/button/ButtonEdit';
import { Container } from 'react-bootstrap';
import TransportSelect from './Modal/transportSelect/TransportSelect';
import NavbarAuthorized from '../components/Header/navbar/NavbarAuthorized';
import ModelsCont from '../components/cardsModels/ModelsCont';
import CardsModels from '../components/cardsModels/CardsModels';
import DarkCardForHome from '../components/ContentForHome/DarkCardForHome/DarkCardForHome'
import field from '../components/data/Frame 25.png';
import '../components/ContentForHome/ContentForHome.css';
import Background from '../components/background/Background';
import GroupTarif from './../components/ContentForHome/DarkCardForHome/Tarif/Tarif';
import NavbarHome from '../components/Header/homeNavbar/NavbarHome';
class Dashboard extends Component {
    
    render(props) {
        return (
            <>
            </>
                );
    }
}; export default Dashboard;