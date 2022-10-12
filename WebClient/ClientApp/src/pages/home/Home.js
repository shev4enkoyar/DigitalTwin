import React, { Component} from 'react';
import ContentForHome from './components/ContentForHome.js';
import Footer from '../../components/footer/Footer.js';
import '../pages.css';
import {Layout} from "../../components/Layout";

class Home extends Component {
    render() {
        return (
            <>
                {/*<Background/>*/}
                <ContentForHome />
                <Footer />
            </>
        );
    }
}

export default Home;

