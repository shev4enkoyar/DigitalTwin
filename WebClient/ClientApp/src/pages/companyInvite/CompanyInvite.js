import {Component} from "react";
import { Button, Container } from "reactstrap/lib";
import React from "react";
import CardForBody from "../../components/cardForBody/CardForBody";
import Input from "../../components/input/Input";
import BootstrapTable from 'react-bootstrap-table-next';
import authService from "../../components/api-authorization/AuthorizeService";
import {ClientRoutes} from "../../util/ClientRoutes";
import { ThemeContextConsumer } from "../../components/ThemeContext";
import './../../pages/pages.css';
import {functionalConverter} from "../../util/functionalConverter";
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
            { dataField: 'role', text: "Роль" },
            { dataField: 'functional', text: "Разрешения" },
        ]
        const selectRow = {
            mode: 'checkbox',
            onSelect: (row, isSelect, rowIndex, e) => {
                let roles = this.state.roles;
                if (isSelect)
                    roles.push(row);
                else
                    roles.splice(roles.indexOf(row), 1)
                this.setState({roles});
            }
        };
        const inviteUser = (email, rolesId) => {
            this.inviteUser(email, rolesId);
        }
        return(
            <ThemeContextConsumer>
                { 
                    context => (
                        <Container>
                            <CardForBody >
                                <BootstrapTable classes={context.theme + " tableForCompanyInvite"} selectRow={selectRow} keyField='id' data={this.state.rolesDb} columns={columns} />
                                <Input Label="Email" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { this.setState({ email: event.target.value.trim() }) }} />
                                <Button onClick={() => {
                                    let email = this.state.email;
                                    let rolesId = "";
                                    this.state.roles.map(el => rolesId += el.id + ";");
                                    inviteUser(email, rolesId);
                                }}>
                                    Пригласить пользователя
                                </Button>
                            </CardForBody>
                        </Container>
                    )
                }
            </ThemeContextConsumer>
        );
    }

    async inviteUser(email, rolesId) {
        const token = await authService.getAccessToken();
        await fetch(`api/company/invite?email=${email}&rolesId=${rolesId}`, {
            headers: !token ? {} :
                {
                    'Authorization': `Bearer ${token}`,
                }
        });
        //TODO придумать чтот получше этого
        alert("Успешно!");
    }

    async populateRoles() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/roles/get_all', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        let result = [];
        data.map(el => {
            let functional = "";
            el.Functional.map(prop => {
                let temp = functionalConverter(prop);
                if (temp !== null)
                    functional += temp;
            });
            result.push({role: el.Role.TranslatedName, functional, id: el.Role.Id })
        })
        this.setState({ rolesDb: result});
    }
}