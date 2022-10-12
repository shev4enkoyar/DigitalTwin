import React, { Component } from 'react';
import '../pages.css';
import {Button, Container} from 'react-bootstrap';
import ModelsCont from './components/ModelsCont';
import {ThemeContextConsumer} from "../../components/ThemeContext";
import {Link} from "react-router-dom";
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
                    <Container style={{ backgroundColor: '#262626', padding: '0px', width: '100%', margin: '0px', maxWidth: '100%', height: '100%'}}>
                        <ModelsCont culture={this.culture}/>
                    </Container>
                </>
            )}
            </ThemeContextConsumer>
        );
    }
} export default Models;