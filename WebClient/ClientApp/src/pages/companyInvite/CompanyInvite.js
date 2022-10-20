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
        this.state = { email: "", roles: "", rolesDb: []};
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
        return(
            <Container>
                <CardForBody >
                    <BootstrapTable rowStyle={{color: "#fff", background: "#262626"}} keyField='id' data={this.state.rolesDb} columns={columns} />
                    <Input Label="Email" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { this.setState({ contractId: event.target.value.trim() }) }} />
                    <Button onClick={() => this.inviteUserByEmail()}>
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
            props.map(prop => {
                if (ClientRoutes.COMPANY_INVITE === prop)
                    functional += "Возможность пприглашать людей в компанию /n";
                if (ClientRoutes.MODELS === prop)
                    functional += "Возможность просматривать технологические карты /n";
                if (ClientRoutes.CREATE_MODEL === prop)
                    functional += "Возможность создавать технологические карты /n";
                if (ClientRoutes.SUBSCRIPTIONS === prop)
                    functional += "Возможность просматривать подписки на технологические карты /n";
                if (ClientRoutes.SUBSCRIPTIONS_ALL === prop)
                    functional += "Возможность оформлять подписки на технологические карты /n";
                if (ClientRoutes.DASHBOARD === prop)
                    functional += "Возможность просматривать общую сводку по технологической карте /n";
                if (ClientRoutes.MAP === prop)
                    functional += "Возможность работы с картой /n";
                if (ClientRoutes.RECOMMENDATIONS === prop)
                    functional += "Возможность просматривать рекомендации по технологической карте /n";
            });
            result.push({role: el, functional })
        })
        this.setState({ rolesDb: result});
    }
}