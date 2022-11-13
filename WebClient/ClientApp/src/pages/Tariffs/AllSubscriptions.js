import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Col, Container, Row } from "reactstrap/lib";
import authService from "../../components/api-authorization/AuthorizeService";
import CardForBody from "../../components/cardForBody/CardForBody";
import { ThemeContextConsumer } from "../../components/ThemeContext";
import { functionalConverter } from "../../util/functionalConverter";
import Combobox from '../../components/combobox/ComboBox.js';
import './../../pages/pages.css';
import './Subscriptions.css';
import {LoadingFragment} from "../../util/LoadingFragment";

class AllSubscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tariffs: [], loading: true, models: [], modal: false, currentTariff: {}, errors: {} };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.GetAllTariffsData();
        this.GetModels();
    }

    Toggle () {
        this.setState({
            modal: !this.state.modal
        })
    }

    CreteNotification() {
        NotificationManager.info("Ваш запрос принят. Вся дальнейшая информация будет направлена по электронной почте.", "", 3000);
    }

    handleValidation(fields) {
        let errors = {};
        let formIsValid = true;

        if (!fields["model"].match(/^[0-9]+$/) || fields["model"] == null) {
            formIsValid = false;
            errors["model"] = "Поле необходимо заполнить";
        }

        if (!fields["duration"].match(/^[0-9]+$/) || fields["duration"] == null) {
            formIsValid = false;
            errors["duration"] = "Поле необходимо заполнить";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }


    handleSubmit (event) {
        event.preventDefault();
        let fields = {}
            fields.model = event.target[0].value;
            fields.duration = event.target[1].value;
        if (this.handleValidation(fields)) {
            fields.subscription = this.state.currentTariff.id;
            console.log(fields)
            this.setState({ modal: false })
            this.CreteNotification()
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
                                        <Button className="my-2 blue_button" style={{ whiteSpace: "nowrap" }} onClick={() => { this.setState({ currentTariff: { id: el.id, name:el.name } }, this.Toggle()) }}>
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
                                                    <Row className="justify-content-between" style={{ padding: "2% 5%" }}>
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
            let options =
                this.state.models.map(el => {
                    return (
                        <option value={el.id}>{el.name}</option>
                    )
                });

        return (
            <ThemeContextConsumer>
                {context => (
                    this.state.loading
                        ?   <LoadingFragment fullscreen={true}/>
                        :   <Container className={context.theme + "Gray d-flex justify-content-center w-100"} fluid>
                            <Row className={context.theme + "Gray mt-3 d-flex"}>
                                    {content}
                                </Row>
                            {this.state.models && <Modal isOpen={this.state.modal} toggle={() => { this.Toggle() }} contentClassName={context.theme + " Gray subscriptions"}>
                                <ModalHeader toggle={() => { this.Toggle() }} className={context.theme + " Gray"}>Оформить подписку "{this.state.currentTariff.name}"</ModalHeader>
                                <ModalBody>
                                   
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <Label for="model">
                                                Модель
                                            </Label>
                                            <Input
                                                id="model"
                                                name="model"
                                                type="select"
                                            >
                                                <option disabled selected>Выберите модель</option>
                                                {options}
                                            </Input>
                                            <span style={{ color: "red" }}>{this.state.errors["model"]}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="duration">
                                                Срок подписки
                                            </Label>
                                            <Input
                                                id="duration"
                                                name="duration"
                                                type="select"
                                            >   
                                                <option disabled selected>Выберите длительность</option>
                                                <option value="1">1 месяц</option>
                                                <option value="3">3 месяца</option>
                                                <option value="6">6 месяцев</option>
                                                <option value="12">12 месяцев</option>
                                            </Input>
                                            <span style={{ color: "red" }}>{this.state.errors["duration"]}</span>
                                        </FormGroup>
                                        <Button color="primary" type="submit">
                                            Оформить подписку
                                        </Button>{' '}
                                        <Button color="secondary" onClick={() => { this.Toggle() }}>
                                            Отменить
                                        </Button>
                                    </Form>
                                </ModalBody>
                            </Modal>}
                            <NotificationContainer />
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
        this.setState({ tariffs: data});
    }

    async GetModels() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/techcard/get_all', {
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
        console.log(data);
        this.setState({ models: data, loading: false });
    }
}

export default AllSubscriptions;