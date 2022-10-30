import React, { Component } from 'react';
import '../pages.css';
import ModelsContent from './components/ModelsContent';
import {ThemeContextConsumer} from "../../components/ThemeContext";
import CardModel from "./components/CardModel";
import authService from "../../components/api-authorization/AuthorizeService";
import {Link} from "react-router-dom";
import {Button, Col, Container} from "reactstrap/lib";
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
            ? <p style={{color: "#FFF"}}><em>Loading...</em></p>
            : <ModelsContent >
                {
                    this.state.culture.map(el =>
                        <Col className="d-flex justify-content-center">
                            <Link to={"/dashboard/" + el.id}>
                                <button className="d-flex justify-content-center" style={this.buttonStyle}>
                                    <CardModel className="d-flex justify-content-center" title={el.name}>
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
                                </button>
                            </Link>

                        </Col>
                    )
                }
              </ModelsContent>
        return (
            <ThemeContextConsumer>{
                context => (
                    <>
                        <Container className={context.theme + "Gray " + "text-center mt-5"} style={{ minWidth: '100%' }} >
                            {content}
                            <Button className="blueBut createBut mt-3 btn-primary"  >
                                <a style={{color: "#fff"}}  href={'/createModel'}>Плюсик</a >
                            </Button>
                        </Container>
                    </>
                )
            }
            </ThemeContextConsumer>
        );
    }

    async GetTechCardsData() {
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
        this.setState({ culture: data, loading: false });
    }

    buttonStyle = {
        backgroundColor: "transparent",
        backgroundRepeat: "no-repeat",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        outline: "none",
        width: "fit-content"
    }
} export default Models;