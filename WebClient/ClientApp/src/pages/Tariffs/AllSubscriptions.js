import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { Col, Container, Row } from "reactstrap/lib";
import authService from "../../components/api-authorization/AuthorizeService";
import CardForBody from "../../components/cardForBody/CardForBody";
import { ThemeContextConsumer } from "../../components/ThemeContext";
import { functionalConverter } from "../../util/functionalConverter";
import './../../pages/pages.css';
import './Subscriptions.css';
import {LoadingFragment} from "../../util/LoadingFragment";

class AllSubscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tariffs: [], loading: true, modal: false, currentTariff: "", errors: {} };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.GetAllTariffsData();
    }

    Toggle () {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleValidation (fields) {
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Все поля должны быть заполнены";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[ЁёА-я]+$/)) {
                formIsValid = false;
                errors["name"] = "Использованы недопустимые символы";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Все поля должны быть заполнены";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");

            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    fields["email"].indexOf("@@") == -1 &&
                    lastDotPos > 2 &&
                    fields["email"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Не кеорректный email";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


    handleSubmit(event) {
        event.preventDefault()
        let fields = {}
        fields.name = event.target[0].value
        fields.email = event.target[1].value
        if (this.handleValidation(fields)) {
            fields.subscription = this.state.currentTariff
            console.log(fields)
        } 
    }

    render() {
        let content =
            this.state.tariffs.map(el => {
                return (
                    <ThemeContextConsumer>
                        {context => (
                            <Col lg={4} className="mb-5 d-flex justify-content-center p-0">
                                <CardForBody styleForCard={{ width: "fit-content", height: "100%", padding: "0 5%" }}>
                                    <h3 className={context.theme + " text-center mt-4"} style={{ color: "#fff" }}>
                                        {el.name}
                                    </h3>
                                    <Container className="text-center">
                                        <Button className="my-4 blue_button" style={{ whiteSpace: "nowrap" }} onClick={() => { this.setState({ currentTariff: el.name }, this.Toggle()) }}>
                                            <img style={{ width: "30px", height: "30px" }} className="icon"
                                                src="https://www.svgrepo.com/show/274451/add.svg" />
                                            {" Оформить подписку"}
                                        </Button>
                                    </Container>
                                    <Container>
                                        <p style={{ color: "#FFF", fontSize: "0.7rem" }} className={context.theme + " text-center"} ><em>Подписка не продлевается автоматически</em></p>
                                    </Container>
                                    <Container>
                                        {el.functions.map(func => {
                                            let description = functionalConverter(func);
                                            return description === null
                                                ?
                                                null
                                                :
                                                (
                                                    <Row className="justify-content-between" style={{ padding: "0 5%" }}>
                                                        <Col className="col-1">
                                                            <p style={{ fontSize: "20px" }}>&#10003;</p>
                                                        </Col>
                                                        <Col className="col-10">
                                                            <p className="text-left">{description}</p>
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
                {context => (
                    this.state.loading
                        ?   <LoadingFragment fullscreen={true}/>
                        :   <Container className={context.theme + "Gray d-flex justify-content-center w-100"} fluid>
                            <Row className={context.theme + "Gray mt-3 d-flex justify-content-center"}>
                                    {content}
                                </Row>
                            <Modal isOpen={this.state.modal} toggle={() => { this.Toggle() }} contentClassName={context.theme + " Gray subscriptions"}>
                                <ModalHeader toggle={() => { this.Toggle() }} className={context.theme + " Gray"}>Оформить подписку "{this.state.currentTariff}"</ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <Label for="name">
                                                Имя
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                            />
                                            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                            />
                                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                        </FormGroup>
                                    <Button color="primary" type="submit">
                                        Оформить подписку
                                    </Button>{' '}
                                         <Button color="secondary" onClick={() => { this.Toggle() }}>
                                        Отменить
                                    </Button>
                                    </Form>
                                </ModalBody>
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