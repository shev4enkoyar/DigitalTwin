import './CardForBody.css';
import { Card, Container } from "reactstrap";
import React from "react";
import { ThemeContextConsumer } from '../ThemeContext';
function CardForBody(props) {
    return (
        <ThemeContextConsumer>
            { 
                context=>(
                <Card style={props.styleForCard} onClick={props.onClick} className={context.theme+" "+props.className + " " + (props.active ? "modal_cont active " : "modal_cont ") +  " CardBodyDark"}>
                    <Container style={props.styleTextForCard} className={props.classForContB + " " + " textForCardDark"}>
                        {props.children}
                    </Container>
                </Card>
                )
            }
        </ThemeContextConsumer>

    );
} export default CardForBody;