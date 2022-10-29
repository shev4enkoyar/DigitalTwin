import React, {Component} from "react";
import CardForBody from "../../components/cardForBody/CardForBody";
import authService from "../../components/api-authorization/AuthorizeService";
import Col from "react-bootstrap/lib/Col";
import {Container} from "reactstrap/lib";
import Button from "react-bootstrap/lib/Button";
import Row from "react-bootstrap/lib/Row";

import './../../pages/pages.css';
import { ThemeContextConsumer } from "../../components/ThemeContext";
class AllSubscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = { tariffs: [], loading: true };
    }

    componentDidMount() {
        this.GetAllTariffsData();
    }

    render() {
        let content =  this.state.loading
            ?
            <ThemeContextConsumer>
                {
                    context=>(
                        <p className={context.theme} style={{ color: "#FFF" }}><em>Loading...</em></p>
                )
                }
            </ThemeContextConsumer>
            :
                this.state.tariffs.map(el => {
                    return (
                        <ThemeContextConsumer>
                            {context=>(
                                <Col>
                                    <CardForBody styleForCard={{ width: "max-content" }}>
                                        <h3 className={context.theme+" text-center mt-4"} style={{ color: "#fff" }}>
                                            {el.name}
                                        </h3>
                                        <Container className="text-center">
                                            <Button className="my-4" style={{ whiteSpace: "nowrap" }}>
                                                <img style={{ width: "30px", height: "30px" }} className="icon"
                                                    src="https://www.svgrepo.com/show/274451/add.svg" />
                                                {" Оформить подписку"}
                                            </Button>
                                        </Container>
                                        <Container>
                                            <p style={{ color: "#FFF", fontSize: "0.7rem" }} className="text-center mb-4"><em>Подписка не продлевается автоматически</em></p>
                                        </Container>
                                    </CardForBody>
                                </Col>
                            )}
                        </ThemeContextConsumer>
                    )
                });
        return (
            <ThemeContextConsumer>
                {context(
                    <Container className="d-flex justify-content-center" fluid>
                        <Row className={context.theme + "Gray mt-3"}>
                            {content}
                        </Row>
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