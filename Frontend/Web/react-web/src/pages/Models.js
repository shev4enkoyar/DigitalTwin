import React, { Component } from 'react';
import Navbar from '../components/Header/navbar/NavbarAuthorized';
import { ThemeContextConsumer } from '../components/ThemeContext.js';
import './pages.css';
import { Row, Col, Container, Card } from 'react-bootstrap';
import ModelsCont from '../components/cardsModels/ModelsCont';
import NavbarHome from "../components/Header/homeNavbar/NavbarHome";
import NavbarAuthorized from "../components/Header/navbar/NavbarAuthorized";
import Background from '../components/background/Background';
class Models extends Component {
    culture = [
    {
        culture: "Пшеница",
        viewModel: "Вид модели",
        currentEvent: "Текущее мероприятие",
        advice: "Совет",
        color: "#00A500"
    },
    {
        culture: "Кукуруза",
        viewModel: "Вид модели",
        currentEvent: "Текущее мероприятие",
        advice: "Совет",
        color: "#FFCC00"
    },
    {
        culture: "Название модели",
        viewModel: "Вид модели",
        currentEvent: "Текущее мероприятие",
        advice: "Совет",
        color: "#FE0000"
        },
    ];
    render() {
        return (
            <ThemeContextConsumer>{context => (
                <>
                <Background/>
                <Container style={{ backgroundColor: '#262626', padding: '0px', width: '100%', margin: '0px', maxWidth: '100%', height: '100%'}}>
                    <NavbarAuthorized />
                        <ModelsCont culture={this.culture}/>
                    </Container>
                </>
            )}
            </ThemeContextConsumer>
        );
    }
} export default Models;