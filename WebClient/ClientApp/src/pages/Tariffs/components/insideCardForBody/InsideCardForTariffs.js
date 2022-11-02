import React from "react";
import { Card, Container, Row } from "reactstrap/lib";
import { ThemeContextConsumer } from "../../../../components/ThemeContext";
import './InsideCardForBody.css';
function CardForTariffs(props) {
    return (
        <ThemeContextConsumer>
            {context => (
                <Card style={props.parentStyle} className={context.theme + "ForInsideCard" + " InsideCardTarriffs "}>
                    <Container className={context.theme + " " + context.theme + "ForInsideCard" + " textInsideForCardTarriffs"}>
                        <Row >
                            {props.children}
                        </Row>
                    </Container>
                </Card>
            )}
        </ThemeContextConsumer>
    );
} export default CardForTariffs;