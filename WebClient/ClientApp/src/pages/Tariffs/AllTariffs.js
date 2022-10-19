import React, {Component} from "react";
import {Button, Col, Container} from "react-bootstrap";
import CardForBody from "../../components/cardForBody/CardForBody";
import authService from "../../components/api-authorization/AuthorizeService";
import CardForTariffs from "./components/insideCardForBody/InsideCardForTariffs";

class AllTariffs extends Component {

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
                <p style={{color: "#FFF"}}><em>Loading...</em></p>
            :
                this.state.tariffs.map(el => {
                    return (
                        <CardForTariffs parentStyle={{width: "100%"}}>
                            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                                <Col >
                                    <p >
                                        {el.name}
                                    </p>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <Button > Выбрать </Button>
                                </Col>
                            </div>

                        </CardForTariffs>
                    )
                });
        return (
            <Container className="d-flex justify-content-center" fluid>
                <CardForBody styleForCard={{ width: "fit-content"}}>
                    <h3 className="text-center my-3" style={{color: "#fff"}}>
                        Подписки
                    </h3>
                    {content}
                </CardForBody>
            </Container>
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

export default AllTariffs;