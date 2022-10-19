import './CardForBody.css';
import { Card, Container } from 'react-bootstrap';
import React from "react";
function CardForBody(props) {
    return(
            <Card style={props.styleForCard} onClick={props.onClick} className={props.className + " " + (props.active ? "modal_cont active " : "modal_cont ") +  " CardBodyDark"}>
                <Container style={props.styleTextForCard} className={props.classForContB + " " + " textForCardDark"}>
                    {props.children}
                </Container>
            </Card>

    );
} export default CardForBody;