import './InsideCardForBody.css';
import {Card, Container, Col, Button, Row} from 'react-bootstrap';
import React from "react";
import {ThemeContextConsumer} from "../../../../components/ThemeContext";
function CardForTariffs(props) { 
    return (
        <ThemeContextConsumer>
            {context => (
                <Card className={context.theme + "ForInsideCard" + " InsideCardTarriffs "}>
                    <Container className={context.theme + " " + context.theme + "ForInsideCard" + " textInsideForCardTarriffs"}>
                        <Row>
                            {props.children}
                        </Row>
                    </Container>
                </Card>
            )}
        </ThemeContextConsumer>
    );
} export default CardForTariffs;