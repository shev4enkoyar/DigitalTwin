import React, { Component, useState } from 'react';
import ContentForHome from '../components/ContentForHome/ContentForHome.js';
import NavbarHome from '../components/Header/homeNavbar/NavbarHome';
import Footer from '../components/Footer/Footer.js';
import './pages.css';
import LogInPopUp from './Modal/login/LogInPopUp.js';
import GrpcTemp from "../util/GrpcTemp";

class Home extends Component {
    render() {
        return (
            <>
                <NavbarHome handleAuthorizedChanged={this.props.handleAuthorizedChanged} isAuthorized={this.props.isAuthorized}/>
                <ContentForHome />
                <Footer />
                <GrpcTemp />
            </>
        );
    }
} export default Home;