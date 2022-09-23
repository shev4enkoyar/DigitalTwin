import React, { Component } from 'react';
import Header_Before_Profile from '../components/Header/Header_Before_Profile/Header_Before_Profile';
import { ThemeContextConsumer } from '../components/ThemeContext.js';
import Inside_Card_For_Body from '../components/Inside_Card_For_Body/Inside_Card_For_Body';
import CardForBody from '../components/Card_For_body/CardForBody';
import './pages.css';
import { Row, Col, Container, Card } from 'react-bootstrap';
import ModelsCont from '../components/CardsModels/ModelsCont';
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
                <div style={{ height: '100%' }}>
                    <Header_Before_Profile />
                    <div className={context.theme + "Gray " + "body_style"}>
                        <ModelsCont culture={this.culture}/>
                    </div>
                </div>)}
            </ThemeContextConsumer>
        );
    }
} export default Models;