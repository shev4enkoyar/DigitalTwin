import React, { Component } from 'react';
import Navbar from '../components/Header/navbar/NavbarAuthorized';
import { ThemeContextConsumer } from '../components/ThemeContext.js';
import './pages.css';
import { Row, Col, Container, Card } from 'react-bootstrap';
import ModelsCont from '../components/cardsModels/ModelsCont';
import NavbarHome from "../components/Header/homeNavbar/NavbarHome";
import NavbarAuthorized from "../components/Header/navbar/NavbarAuthorized";
class Models extends Component {
    culture = [{
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
        }];
    render() {
        return (
            <ThemeContextConsumer>{context => (
                <div className={"mainContainer"}>
                    <NavbarAuthorized />
                    <div className={context.theme + "Gray " + "body_style"}>
                        <ModelsCont culture={this.culture}/>
                    </div>
                </div>)}
            </ThemeContextConsumer>
        );
    }
} export default Models;