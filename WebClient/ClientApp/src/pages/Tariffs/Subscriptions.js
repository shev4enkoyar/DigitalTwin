import React, { Component } from 'react';
import { ThemeContextConsumer } from '../../components/ThemeContext.js';
import CardForTariffs from './components/insideCardForBody/InsideCardForTariffs';
import CardForBody from '../../components/cardForBody/CardForBody';
import '../pages.css';
import {Button, Col, Container, Row} from 'react-bootstrap';
import TableForTariffs from './components/tableForTariffs/TableForTariffs';
import {Link} from "react-router-dom";
import authService from "../../components/api-authorization/AuthorizeService";
class Subscriptions extends Component {
    constructor(props) {
        super(props);
        this.state = { tariffs: [], loading: true };
    }

    componentDidMount() {
        this.GetTariffs();
    }

    headerForTariffs = [ '#', 'Дата', 'Наименования', 'Сумма'];
    historyTariffs = [{
        num: "1",
        date: new Date(2020, 4, 7).toLocaleDateString(),
        name: "Подписка 1",
        sum:"5000p"
    },
        {
            num: "2",
            date: new Date(2020, 7, 21).toLocaleDateString(),
            name: "Подписка 2",
            sum: "10000р"
        },
        {
            num: "3",
            date: new Date(2020, 11, 12).toLocaleDateString(),
            name: "Подписка 3",
            sum: "22000р"
        },
        {
            num: "4",
            date: new Date(2021, 1, 30).toLocaleDateString(),
            name: "Подписка 4",
            sum: "35000р"
        },
        {
            num: "5",
            date: new Date(2021, 4, 25).toLocaleDateString(),
            name: "Подписка 1",
            sum: "5000р"
        },
        {
            num: "6",
            date: new Date(2021, 9, 28).toLocaleDateString(),
            name: "Подписка 2",
            sum: "10000р"
        },
        {
            num: "7",
            date: new Date(2022, 0, 22).toLocaleDateString(),
            name: "Подписка 3",
            sum: "22000р"
        },
        {
            num: "8",
            date: new Date(2022, 4, 13).toLocaleDateString(),
            name: "Подписка 4",
            sum: "35000р"
        }
    ]
    
    render() {
        let content = this.state.loading
            ?
                <p style={{color: "#FFF"}}><em>Loading...</em></p>
            :
                Object.entries(this.state.tariffs).map(([el, props]) =>
                    <>
                        <p style={{color: "#FFF"}}>{"Модель: " + el}</p>
                        props.length === 0
                            ?
                                <p style={{color: "#FFF"}}><em>Loading...</em></p>
                            :
                        {props.map(prop => {
                            return (
                                <CardForTariffs >
                                    <Col style={{ margin: '0% 6% 0% 0%' }}>
                                        <p style={{ margin: '0px', lineHeight: '15px' }} >
                                            {"Подписка: " + prop}
                                        </p>
                                    </Col>

                                    <Col className="d-flex justify-content-end">
                                        <Button variant="success" imageClassName="icon_for_but">
                                            <img style={{width: "25px", height: "25px"}} className="icon"
                                                 src="https://img.icons8.com/ios-filled/344/update-tag.png"/>
                                        </Button>
                                    </Col>
                                    <Col >
                                        <Button variant="danger" >
                                            <img style={{width: "25px", height: "25px"}} class="icon" src="https://www.svgrepo.com/show/59221/delete.svg"/>
                                        </Button>
                                    </Col>

                                </CardForTariffs>
                            );
                        })
                        }
                    </>
                )
        return (
            <ThemeContextConsumer>{context => (
                <div >
                    <Container className={context.theme + "Gray " + "body_style"}>
                        <Row>
                            <Col className="MargForCol">
                                <CardForBody styleForCard={{ position: 'relative', width: "fit-content"}} className="signUpWidth text-center" classForContB=" centerCard" >
                                    <p className="textOpenSansForHistTar">
                                        Продлить/отменить подписки
                                    </p>
                                    {
                                        content
                                    }
                                    <Button className="my-3" onClick={() => window.location.replace("/tariffs-all")}>
                                            <img style={{width: "35px", height: "35px"}} className="icon"
                                                 src="https://www.svgrepo.com/show/274451/add.svg"/>
                                        {" Добавить подписку"}
                                    </Button>

                                </CardForBody>
                            </Col>
                            <Col className="MargForCol">
                                <CardForBody styleForCard={{ position: 'relative' }} className="signUpWidth">
                                    <Container className="ContForHistoryTariff">
                                        <TableForTariffs textForTable="История подписок" classNamesTD="ForBox" headersForTable={this.headerForTariffs} contentsForTable={this.historyTariffs} />
                                    </Container>
                                </CardForBody>
                            </Col>
                        </Row>
                    </ Container>
                </div>
            )}
            </ThemeContextConsumer>
        );
    }

    async GetTariffs() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/subscriptions/get_all_by_company', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        debugger;
        this.setState({ tariffs: data, loading: false });
    }
} export default Subscriptions;