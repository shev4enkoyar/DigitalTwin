import './InsideCardForBody.css';
import {Card, Container, Col, Button} from 'react-bootstrap';
import React from "react";
import {ThemeContextConsumer} from "../../../../components/ThemeContext";
function CardForTariffs(props) { 
    return (
        <ThemeContextConsumer>
            {context => (
                <Card className={context.theme + "ForInsideCard" + " InsideCardTarriffs "}>
                    <Container className={context.theme + " " + context.theme + "ForInsideCard" + " textInsideForCardTarriffs"}>{props.children}
                        <Col style={{ margin: '0% 6% 0% 0%' }}>
                            <p style={{ margin: '0px', lineHeight: '15px' }} >
                                {props.AddCancel}
                            </p>
                        </Col>
                        <Button className="redBut ButAllMini"  imageClassName="icon_for_but" > Крестик</Button>
                        <Button className="greenBut ButAllMini" imageClassName="icon_for_but"> Обновить </Button>
                    </Container>
                </Card>
            )
            }
        </ThemeContextConsumer>
    );
} export default CardForTariffs;