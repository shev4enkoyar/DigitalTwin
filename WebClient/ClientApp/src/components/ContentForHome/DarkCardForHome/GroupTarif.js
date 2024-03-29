import React, { Component } from 'react';
import { Container } from "reactstrap/lib";
import { functionalConverter } from "../../../util/functionalConverter";
import authService from "../../api-authorization/AuthorizeService";
import { ThemeContextConsumer } from "../../ThemeContext";
import './DarkCardForHome.css';
import Tarif from './Tarif/Tarif.js';
import {LoadingFragment} from "../../../util/LoadingFragment";
class GroupTarif extends Component{
    constructor(props) {
        super(props);
        this.state = { tariffs: [], loading: true };
    }

    componentDidMount() {
        this.GetAllTariffsData();
    }


    render(){
        return (
            <ThemeContextConsumer>{context => (
                <Container className={context.theme + "Gray" + " textForCardDark"}>
                    <p id="tariffs" className={context.theme + "Gray "} style={{ fontSize: '17px', margin: ' 10px 0px', fontFamily: 'Roboto!important', background: '#ffffff00' }} >
                        Тарифные планы
                    </p>
                    <Container id="TarifList" className="mb-4">
                        {
                            this.state.loading
                            ?
                                <LoadingFragment/>
                            :
                                this.state.tariffs.map(el => {
                                    return (
                                        <Tarif light={context.theme} >
                                            <h5 className={context.theme.light}>
                                                {el.name}
                                            </h5>
                                            {/*<p className={context.theme.light}>
                                                <em>{el.price + " руб/месяц"}</em>
                                            </p>*/}
                                            <ul  id="tarifUL">
                                                {
                                                    el.functions.map(functional => {
                                                        return (
                                                            <li>
                                                                {functional}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </Tarif>
                                    );
                                })
                        }
                    </Container>
                </Container>
            )}</ThemeContextConsumer>

        );
    }

    async GetAllTariffsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/subscriptions/get_all', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        let data = await response.json();
        data.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
        let result = [];
        data.map(el => {
            let functional = [];
            el.functions.map(prop => {
                let description = functionalConverter(prop);
                if(description !== null)
                    functional.push(description);
            });
            result.push({name: el.name, price: el.price, functions: functional })
        })
        this.setState({ tariffs: result, loading: false });
    }

} export default GroupTarif;