import './InsideCardForBody.css';
import { Card, Container } from 'react-bootstrap';
import React from "react";
import {ThemeContextConsumer} from "../../../../components/ThemeContext";

function InsideCardForBody(props) {
    return (
        <ThemeContextConsumer>
            {context => (
                <Card className={context.theme + " " + context.theme + "ForInsideCardShadow " + " " +context.theme +"ForInsideCard  " + " InsideCardBody"}>
                    <Container className={context.theme + " " + context.theme + "ForInsideCard  " + " textInsideForCard"}>
                        {props.children}
                    </Container>
                </Card>
            )}
        </ThemeContextConsumer>
    );
} export default InsideCardForBody;