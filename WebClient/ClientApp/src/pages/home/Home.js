import React, { Component } from 'react';
import Footer from '../../components/footer/Footer.js';
import '../pages.css';
import HomeContent from './components/HomeContent.js';

class Home extends Component {
    render() {
        return (
            <>
                <HomeContent />
                <Footer />
            </>
        );
    }
}

export default Home;

