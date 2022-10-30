import './InsideCardForBody.css';
import React from "react";
import {ThemeContextConsumer} from "../../../../components/ThemeContext";
import {Card, Container, Row} from "reactstrap/lib";
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