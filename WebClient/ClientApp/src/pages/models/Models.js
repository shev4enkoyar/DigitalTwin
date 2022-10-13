import React, { Component } from 'react';
import '../pages.css';
import {Button, Col, Container} from 'react-bootstrap';
import ModelsContent from './components/ModelsContent';
import {ThemeContextConsumer} from "../../components/ThemeContext";
import CardModel from "./components/CardModel";
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
                    <Container className="text-center mt-5" >
                            <ModelsContent >
                                {
                                    this.culture.map(el =>
                                        <Col className="d-flex justify-content-center">
                                            <CardModel cult={el} />
                                        </Col>
                                    )
                                }
                            </ModelsContent>
                            <Button className="blueBut createBut mt-3" textForButton="Новая модель" classTextName="textOpenSans14" imageClassName="plus" >
                                <a style={{color: "#fff"}}  href={'/createModel'}>Плюсик</a >
                            </Button>
                    </Container>
                </>
            )}
            </ThemeContextConsumer>
        );
    }
} export default Models;