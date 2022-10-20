import {Component} from "react";
import {Button, Container} from "react-bootstrap";
import React from "react";
import CardForBody from "../../components/cardForBody/CardForBody";
import Input from "../../components/input/Input";
import BootstrapTable from 'react-bootstrap-table-next';
import authService from "../../components/api-authorization/AuthorizeService";
import {ClientRoutes} from "../../util/ClientRoutes";

export class CompanyInvite extends Component{

    constructor(props) {
        super(props);
        this.state = { email: "", roles: [], rolesDb: []};
    }

    componentDidMount() {
        this.populateRoles();
    }


    render() {
        const products = [
            { role: 'Бухгалтер', functional: 'Отчёты' },
            { role: 'Хороший мальчик', functional: 'Самое лучшее на этом сервисе' },
            { role: 'Плохой мальчик~', functional: 'Достойное наказание' },
            { role: 'Король', functional: 'Власть, которая и не снилась отцу' }
        ];

        const columns = [
            { dataField: 'role', text: <p style={{color: "#fff"}}>Роль</p> },
            { dataField: 'functional', text: <p style={{color: "#fff"}}>Разрешения</p> },
        ]
        const selectRow = {
            mode: 'checkbox',
            onSelect: (row, isSelect, rowIndex, e) => {
                let roles = this.state.roles;
                if (isSelect)
                    roles.push(row.role);
                else
                    roles.splice(roles.indexOf(row.role), 1)
                this.setState({roles});
            }
        };
        return(
            <Container>
                <CardForBody >
                    <BootstrapTable selectRow={selectRow} rowStyle={{color: "#fff", background: "#262626"}} keyField='id' data={this.state.rolesDb} columns={columns} />
                    <Input Label="Email" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { this.setState({ contractId: event.target.value.trim() }) }} />
                    <Button onClick={() => alert(this.state.roles)}>
                        Зарегистрировать компанию
                    </Button>
                </CardForBody>
            </Container>
        );


        }

    async populateRoles() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/roles/get_all', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        let result = [];
        Object.entries(data).map(([el, props]) => {
            let functional = "";
            let functionalName = "";
            props.map(prop => {
                if (ClientRoutes.COMPANY_INVITE === prop){
                    functional += "Возможность приглашать людей в компанию; ";
                }
                if (ClientRoutes.MODELS === prop){
                    functional += "Возможность просматривать технологические карты; ";
                }
                if (ClientRoutes.CREATE_MODEL === prop){
                    functional += "Возможность создавать технологические карты; ";
                }
                if (ClientRoutes.SUBSCRIPTIONS === prop){

                    functional += "Возможность просматривать подписки на технологические карты; ";
                }

                if (ClientRoutes.SUBSCRIPTIONS_ALL === prop){

                    functional += "Возможность оформлять подписки на технологические карты; ";
                }

                if (ClientRoutes.DASHBOARD === prop){

                    functional += "Возможность просматривать общую сводку по технологической карте; ";
                }
                if (ClientRoutes.MAP === prop){

                    functional += "Возможность работы с картой; ";
                }
                if (ClientRoutes.RECOMMENDATIONS === prop){

                    functional += "Возможность просматривать рекомендации по технологической карте; ";
                }
            });
            result.push({role: el, functional, functionalName })
        })
        this.setState({ rolesDb: result});
    }
}