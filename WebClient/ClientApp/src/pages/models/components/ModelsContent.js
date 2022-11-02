import React, { Children } from "react";
import { Col, Container, Row } from "reactstrap/lib";
import { ThemeContextConsumer } from "../../../components/ThemeContext";
import './CardModels.css';
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
                            <Row className="row-cols-xs-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
                                {props.children}
                            </Row>
                        </Container>
                    </>
                )
            }
        </ThemeContextConsumer>
    )
} export default ModelsContent;