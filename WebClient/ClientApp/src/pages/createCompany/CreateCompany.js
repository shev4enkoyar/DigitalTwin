import React, {Component} from "react";
import { Button, Container } from "reactstrap/lib";
import Input from "../../components/input/Input";
import CardForBody from "../../components/cardForBody/CardForBody";
import authService from "../../components/api-authorization/AuthorizeService";
import { ThemeContextConsumer } from "../../components/ThemeContext";

export class CreateCompany extends Component {

    constructor(props) {
        super(props);
        this.state = { name: "", inn: "", supervisorName: "", contractId: "", error: ""};
    }

    render() {
        return (
            <ThemeContextConsumer>
                {
                    context => (
                        <Container className={context.theme + "Gray " + "d-flex justify-content-center"} style={{marginTop:'3px'} }>
                            <CardForBody styleForCard={{ width: 'max-content' }} >
                                <p className="my-4" style={{ color: "red" }}>{this.state.error}</p>
                                <Input Label="Название комании" classNameP="textForSign16" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { let reg = /^[0-9A-Za-zА-Яа-я]*$/i.test(event.target.value); if (reg) this.setState({ name: event.target.value.trim() }) }} />
                                <Input Label="ИНН" classNameP="textForSign16" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { let reg = /^[0-9A-Za-zА-Яа-я]*$/i.test(event.target.value); if (reg) this.setState({ inn: event.target.value.trim() }) }} />
                                <Input Label="Имя руководителя" classNameP="textForSign16" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { let reg = /^[0-9A-Za-zА-Яа-я]*$/i.test(event.target.value); if (reg) this.setState({ supervisorName: event.target.value.trim() }) }} />
                                <Input Label="ID контракта" classNameP="textForSign16" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { this.setState({ contractId: event.target.value.trim() }) }} />
                                <Container className="my-3 mb-4">
                                    <Button onClick={() => this.createCompany()}>
                                        Зарегистрировать компанию
                                    </Button>
                                </Container>
                            </CardForBody>
                        </Container>
                    )
                }
            </ThemeContextConsumer>
        );
    }

    async createCompany() {
        if (this.state.name === "" || this.state.inn === "" || this.state.supervisorName === "" || this.state.contractId === ""){
            this.setState({error: "Одно или несколько полей пусто"});
            return "error"
        }
        const token = await authService.getAccessToken();
        await fetch(`api/company/create?name=${this.state.name}&inn=${this.state.inn}&supervisorName=${this.state.supervisorName}&contractId=${this.state.contractId}`, {
            headers: !token ? {} :
                {
                    'Authorization': `Bearer ${token}`,
                }
        });
        this.setState({error: "Компания создана"});
    }
}