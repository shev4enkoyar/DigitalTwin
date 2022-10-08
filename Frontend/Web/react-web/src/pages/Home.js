import React, { Component, useState } from 'react';
import ContentForHome from '../components/ContentForHome/ContentForHome.js';
import NavbarHome from '../components/Header/homeNavbar/NavbarHome';
import Footer from '../components/footer/Footer.js';
import './pages.css';
import GrpcTemp from "../util/GrpcTemp";
import Background from './../components/background/Background';

class Home extends Component {
    render() {
        return (
            <>
                <Background/>
                <NavbarHome handleAuthorizedChanged={this.props.handleAuthorizedChanged} isAuthorized={this.props.isAuthorized}/>
                <ContentForHome />
                <Footer />
                <GrpcTemp />
            </>
        );
    }
} export default Home;