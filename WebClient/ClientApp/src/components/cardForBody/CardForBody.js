import React from "react";
import { Card, Container } from "reactstrap";
import { ThemeContextConsumer } from '../ThemeContext';
import './CardForBody.css';
function CardForBody(props) {
    return (
        <ThemeContextConsumer>
            { 
                context=>(
                <Card disabled={props.disabled} style={props.styleForCard} onClick={props.onClick} className={context.theme+" "+props.className + " " + (props.active ? "modal_cont active " : "modal_cont ") +  " CardBodyDark"}>
                    <Container style={props.styleTextForCard} className={props.classForContB + " " + " textForCardDark"}>
                        {props.children}
                    </Container>
                </Card>
                )
            }
        </ThemeContextConsumer>

    );
} export default CardForBody;