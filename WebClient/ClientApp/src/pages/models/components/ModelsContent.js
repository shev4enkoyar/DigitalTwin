import './CardModels.css';
import {Col, Container, Row} from 'react-bootstrap';
import CardsModels from './CardsModels';
import React, {Children} from "react";
import {ThemeContextConsumer} from "../../../components/ThemeContext";
import CardModel from "./CardModel";
function ModelsContent(props) {
    
    return (
        <ThemeContextConsumer>
            {
                context => (
                    <>
                        <Container>
                            <Row>
                                <Col>
                                    <p className={context.theme + "Gray textForH justify-content-center d-flex"}>
                                        Модели {Children.count(props.children)}/15
                                    </p>
                                </Col>
                                <Col></Col>
                                <Col>
                                    <p className={context.theme + "Gray textForH justify-content-center d-flex"}>
                                        Общая площадь 1234/5000
                                    </p>
                                </Col>
                            </Row>
                        </Container>

                        <Container>
                            <Row >
                                {props.children}
                            </Row>
                        </Container>
                    </>
                )
            }
        </ThemeContextConsumer>
    )
} export default ModelsContent;