import { Modal } from "reactstrap";
import React, { Component } from "react";
import CardForBody from "../../components/cardForBody/CardForBody";
import authService from "../../components/api-authorization/AuthorizeService";
import {Button, Col, Container, Row} from "reactstrap/lib";
import './Subscriptions.css';
import './../../pages/pages.css';
import { ThemeContextConsumer } from "../../components/ThemeContext";
class AllSubscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = { tariffs: [], loading: true, modal: false, currentTariff: "" };
    }

    componentDidMount() {
        this.GetAllTariffsData();
    }

    render() {
        let content = this.state.loading
            ?
            <ThemeContextConsumer>
                {
                    context => (
                        <p className={context.theme} style={{ color: "#FFF" }}><em>Loading...</em></p>
                    )
                }
            </ThemeContextConsumer>
            :
            this.state.tariffs.map(el => {
                return (
                    <ThemeContextConsumer>
                        {context => (
                    <Col lg={4} xl={3} className="mb-5 d-flex justify-content-center p-0">
                        <CardForBody styleForCard={{ width: "fit-content", height: "100%", padding: "0 5%" }}>
                                    <h3 className={context.theme + " text-center mt-4"} style={{ color: "#fff" }}>
                                {el.name}
                            </h3>
                            <Container className="text-center">
                                <Button className="my-4 blue_button" style={{ whiteSpace: "nowrap"}} onClick={() => { this.setState({ currentTariff: el.name }, this.setState({ modal: true })) }}>
                                    <img style={{ width: "30px", height: "30px" }} className="icon"
                                        src="https://www.svgrepo.com/show/274451/add.svg" />
                                    {" Оформить подписку"}
                                </Button>
                            </Container>
                            <Container>
                                <p style={{ color: "#FFF", fontSize: "0.7rem" }} className="text-center mb-4"><em>Подписка не продлевается автоматически</em></p>
                            </Container>
                            <Container>
                                {el.functions.map(func => {
                                    return (
                                        <Row className="justify-content-between" style={{ padding: "0 5%" }}>
                                            <Col className="col-1">
                                                <p style={{ fontSize: "20px" }}>&#10003;</p>
                                            </Col>
                                            <Col className="col-10">
                                                <p className="text-left">{func}</p>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Container>
                        </CardForBody>
                         </Col>
                        )}
                    </ThemeContextConsumer>
                )
            });
        return (
            <ThemeContextConsumer>
                {context=>(
                    <Container className={context.theme + "Gray d-flex justify-content-center w-100"} fluid>
                        <Row className={context.theme + "Gray mt-3"}>
                    {content}
                </Row>


                <Modal animation={ false} centered className="subscriptions" show={this.state.modal} onHide={() => { this.setState({ modal: false }) }}>
                    <Modal.Header style={{ border: "none" }}>
                        <Modal.Title>Оформить подписку</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Оформить подписку "{this.state.currentTariff}"</Modal.Body>
                    <Modal.Footer style={{ border: "none" }}>
                        <Button className="grey_button" onClick={() => { this.setState({ modal: false }) }}>
                            Отменить
                        </Button>
                        <Button className="green_button" onClick={() => { this.setState({ modal: false }) }}>
                            Подтвердить
                        </Button>
                    </Modal.Footer>
                </Modal>

                
                </Container>
                )
                }
            </ThemeContextConsumer>
        );
    }

    async GetAllTariffsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/subscriptions/get_all', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        data.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
        this.setState({ tariffs: data, loading: false });
    }
}

export default AllSubscriptions;