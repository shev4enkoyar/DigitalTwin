import React, { Component, useState } from 'react';
import ContentForHome from '../components/ContentForHome/ContentForHome.js';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer.js';
import './pages.css';
import LogInPopUp from './Modal/LogInPopUp.js';

class Home extends Component {
    render() {
        return (
            <>
                <Header />
                <ContentForHome />
                <Footer />
            </>
        );
    }
} export default Home;