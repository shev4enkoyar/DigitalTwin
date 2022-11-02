import React, { Component } from "react";
import authService from "../../../components/api-authorization/AuthorizeService";
import Input from '../../../components/input/Input';
import BaseCard from "./BaseCard";
import './CardsForDashboard.css';
import {Container, Row} from "reactstrap";
class FieldCard extends Component{
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    render() {
        return (
            <BaseCard className="widForCult" visible={this.props.visible} off={this.props.statusOff} hText="Статус тех.карты" descr="Требуется добавить данные о поле!" notifyColor="#DC3545">
                {
                    this.state.error == null
                        ?
                            null
                        :
                            <p style={{ color: "darkred" }}>
                                {this.state.error}
                            </p>
                }
                <Container style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-end', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                    <Input className="inpCreateForDashCard"
                           Label="Кадастровый номер"
                           classNameP="textForSign12"
                           onInput={(event) => {
                               let cadaster = event.target.value.trim();
                               this.props.setStatus({ kad: cadaster })
                           }}
                           value={this.props.values.kad}
                    />
                </Container>
                <Container className="contButton">
                    <Row className="mx-2">
                        <button onClick={() => { this.props.Back() }} className="btn btn-primary mr-2 my-2" style={{ width: "max-content" }} >
                            Назад
                        </button>
                        <button className="btn btn-primary ml-2 my-2"
                            style={{ width: "max-content" }}
                            onClick={async () => {
                                let cadaster = this.props.values.kad;
                                let validate = await this.validateCadaster(cadaster);
                                debugger;
                                if (validate)
                                    this.props.onClick()
                                else
                                    this.setState({ error: "Кадастровый номер не найден" })
                            }}
                        >
                            Далее
                        </button>
                    </Row>
                    <button className="btn btn-primary m-2"
                        style={{ width: "max-content" }}
                        onClick={() => {
                            this.props.onClick()
                        }}
                    >
                        Пропустить
                    </button>
                </Container>
            </BaseCard>
        )
    }

    async validateCadaster(cadaster){
        const token = await authService.getAccessToken();
        let response = await fetch(`api/cadaster/validate/${cadaster}`, {
                            headers: !token ? {} :
                                {
                                    'Authorization': `Bearer ${token}`,
                                }
                        });
        return  response.ok;
    }
}
export default FieldCard;