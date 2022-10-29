import Input from '../../../components/input/Input';
import './CardsForDashboard.css';
import BaseCard from "./BaseCard";
import React, {Component} from "react";
import authService from "../../../components/api-authorization/AuthorizeService";
import {Button, Container} from "reactstrap/lib";
class FieldCard extends Component{
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    render() {
        return (
            <BaseCard visible={this.props.visible} off={this.props.statusOff} hText="Статус модели" descr="Требуется добавить данные о поле!" notifyColor="#DC3545"
                      isBut={
                          <Button className="blueBut ButAllMini" >
                              <img style={{ width: "25px", height: "25px" }} className="icon" src="https://img.icons8.com/small/344/map.png" />
                          </Button>
                      }>
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
                    <Button className="btn btn-primary my-2"
                            style={{ width: "190px" }}
                            onClick={async () => {
                                let cadaster = this.props.values.kad;
                                let validate = await this.validateCadaster(cadaster);
                                debugger;
                                if(validate)
                                    this.props.onClick()
                                else
                                    this.setState({ error: "Кадастровый номер не найден" })
                            }}
                    >
                        Далее
                    </Button>
                    <Button className="btn btn-primary my-2"
                            style={{ width: "190px" }}
                            onClick={() => {
                                this.props.onClick()
                            }}
                    >
                        Пропустить
                    </Button>
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