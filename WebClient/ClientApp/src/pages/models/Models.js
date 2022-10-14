import React, { Component } from 'react';
import '../pages.css';
import {Button, Card, Col, Container} from 'react-bootstrap';
import ModelsContent from './components/ModelsContent';
import {ThemeContextConsumer} from "../../components/ThemeContext";
import CardModel from "./components/CardModel";
import authService from "../../components/api-authorization/AuthorizeService";
class Models extends Component {

    constructor(props) {
        super(props);
        this.state = { culture: [], loading: true };
    }

    componentDidMount() {
        this.GetTechCardsData();
    }

    render() {

        let content =  this.state.loading
            ? <p><em>Loading...</em></p>
            : <ModelsContent >
                {
                    this.state.culture.map(el =>
                        <Col className="d-flex justify-content-center">
                            <CardModel title={el.name}>
                                <p className="paramForModelCard">
                                    {el.productName}
                                </p>
                                <p className="paramForModelCard">
                                    {"Текущее мероприятие"}
                                </p>
                                <p className="paramForModelCard">
                                    {"Совет"}
                                </p>
                            </CardModel>
                        </Col>
                    )
                }
              </ModelsContent>
        return (
            <ThemeContextConsumer>{context => (
                <>
                    <Container className="text-center mt-5" >
                        {content}
                        <Button className="blueBut createBut mt-3" textForButton="Новая модель" classTextName="textOpenSans14" imageClassName="plus" >
                            <a style={{color: "#fff"}}  href={'/createModel'}>Плюсик</a >
                        </Button>
                    </Container>
                </>
            )}
            </ThemeContextConsumer>
        );
    }

    async GetTechCardsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/techcard', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ culture: data, loading: false });
    }
} export default Models;