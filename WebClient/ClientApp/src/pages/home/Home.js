import React, { Component} from 'react';
import HomeContent from './components/HomeContent.js';
import Footer from '../../components/footer/Footer.js';
import '../pages.css';

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

