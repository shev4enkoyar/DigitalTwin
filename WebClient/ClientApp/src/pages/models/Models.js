import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Container } from "reactstrap/lib";
import authService from "../../components/api-authorization/AuthorizeService";
import { ThemeContextConsumer } from "../../components/ThemeContext";
import '../pages.css';
import CardModel from "./components/CardModel";
import ModelsContent from './components/ModelsContent';
import {LoadingFragment} from "../../util/LoadingFragment";
class Models extends Component {

    constructor(props) {
        super(props);
        this.state = { culture: [], loading: true };
    }

    componentDidMount() {
        this.GetTechCardsData();
    }

    render() {

        let content =
            <ModelsContent >
                {
                    this.state.culture.map(el =>
                        <Col className="d-flex justify-content-center" >
                            <Link to={"/dashboard/" + el.id}>
                                <button className="d-flex btn-primary justify-content-center" style={this.buttonStyle}>
                                    <CardModel className="d-flex justify-content-center" title={el.name}>
                                        <p className="paramForModelCard">
                                            {el.productName}
                                        </p>
                                        <p className="paramForModelCard">
                                            {el.taskName}
                                        </p>
                                        <p className="paramForModelCard">
                                            {el.recommendationName}
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
                    this.state.loading
                        ?   <LoadingFragment fullscreen={true}/>
                        :   <>
                                <Container className={context.theme + "Gray " + "text-center mt-5"} style={{ minWidth: '100%' }} >
                                    {content}
                                    <button className="btn createBut mt-3 btn-primary">
                                        <a className="d-flex align-items-center" style={{ color: "#fff" }} href={'/createModel'}>
                                            <img style={{ width: "35px", height: "35px", paddingRight:"5px" }} className="icon"
                                                src="https://www.svgrepo.com/show/274451/add.svg" />
                                            Новая модель
                                        </a >
                                    </button>
                                </Container>
                            </>
                )
            }
            </ThemeContextConsumer>
        );
    }

    async GetTechCardsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/techcard/get_all_with_rec', {
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