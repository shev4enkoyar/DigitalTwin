import './DarkCardForHome.css';
import Tarif from './Tarif/Tarif.js';
import React, {Component} from 'react';
import { ThemeContextConsumer } from "../../ThemeContext"
import authService from "../../api-authorization/AuthorizeService";
import {ClientRoutes} from "../../../util/ClientRoutes";
import {Container} from "reactstrap/lib";
class GroupTarif extends Component{
    constructor(props) {
        super(props);
        this.state = { tariffs: [], loading: true };
    }

    componentDidMount() {
        this.GetAllTariffsData();
    }

    tariffs = [
        {
            name: "Прогнозирование урожайности",
            cost: "5000 руб/год",
            possibility: ["Возможность 1","Возможность 2","Возможность 3","Возможность 4","Возможность 5"]
        },
        {
            name: "Прогнозирование нештатных ситуаций",
            cost: "10000 руб/год",
            possibility: ["Возможность 1", "Возможность 2", "Возможность 3", "Возможность 4", "Возможность 5"]
        },
        {
            name: "Поддержка принятия решений",
            cost: "15000 руб/год",
            possibility: ["Возможность 1", "Возможность 2", "Возможность 3", "Возможность 4", "Возможность 5"]
        }
    ]
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
                                <p style={{color: "#FFF"}}><em>Loading...</em></p>
                            :
                                this.state.tariffs.map(el => {
                                    return (
                                        <Tarif light={context.theme} >
                                            <h5 className={context.theme.light}>
                                                {el.name}
                                            </h5>
                                            <p className={context.theme.light}>
                                                <em>{el.price + " руб/месяц"}</em>
                                            </p>
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
                if (ClientRoutes.COMPANY_INVITE === prop){
                    functional.push("Возможность приглашать людей в компанию; ");
                }
                if (ClientRoutes.MODELS === prop){
                    functional.push("Возможность просматривать технологические карты; ");
                }
                if (ClientRoutes.CREATE_MODEL === prop){
                    functional.push("Возможность создавать технологические карты; ");
                }
                if (ClientRoutes.SUBSCRIPTIONS === prop){

                    functional.push("Возможность просматривать подписки на технологические карты; ");
                }

                if (ClientRoutes.SUBSCRIPTIONS_ALL === prop){

                    functional.push("Возможность оформлять подписки на технологические карты; ");
                }

                if (ClientRoutes.DASHBOARD === prop){

                    functional.push("Возможность просматривать общую сводку по технологической карте; ");
                }
                if (ClientRoutes.MAP === prop){

                    functional.push("Возможность работы с картой; ");
                }
                if (ClientRoutes.RECOMMENDATIONS === prop){
                    functional.push("Возможность просматривать рекомендации по технологической карте; ");
                }
            });
            result.push({name: el.name, price: el.price, functions: functional })
        })
        this.setState({ tariffs: result, loading: false });
    }

} export default GroupTarif;