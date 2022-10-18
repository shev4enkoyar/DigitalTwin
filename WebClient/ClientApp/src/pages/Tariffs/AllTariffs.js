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
                        <CardForTariffs >
                            <Col style={{ margin: '0% 6% 0% 0%' }}>
                                <p style={{ margin: '0px', lineHeight: '15px' }} >
                                    {el.name}
                                </p>
                            </Col>
                            <Col>
                                <Button className="greenBut ButAllMini" imageClassName="icon_for_but"> Добавить подписку </Button>
                            </Col>
                        </CardForTariffs>
                    )
                });
        return (
            <Container>
                <CardForBody>
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