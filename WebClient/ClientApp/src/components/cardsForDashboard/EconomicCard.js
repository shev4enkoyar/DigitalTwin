import './CardsForDashboard.css';
import { Button, Container, Row,Col } from 'react-bootstrap';
import BaseCard from "./BaseCard";
import Input from "./../input/Input";
import React, {useState} from "react";
import authService from "../api-authorization/AuthorizeService";
import axios from "axios";
const EconomicCard = (props) => {
    const CreateTechCard = async (digitalModel) => {
        const token = await authService.getAccessToken();
        let response = null;
        await fetch(`api/techcard/create?name=${digitalModel.Name}&productId=${digitalModel.ProductId}`, {
            headers: !token ? {} :
                {
                    'Authorization': `Bearer ${token}`,
                }
        });
        return await response.text();
    }
    const isFull = () => {
        if (this.props.values === null || this.props.values === undefined) {
        }
        return !Object.keys(this.props.values).map(val => this.props.values[val]).some(function (value, index, array) { return (value === false || value === 0 || value === "" || value === undefined) })
    }
    return (
        <BaseCard visible={props.visible} hText="Статус модели" descr="Требуется добавить данные экономических показателей!" notifyColor="#DC3545">
            <Col>
                <Input Label="Наименование работы по высеву" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" value={props.values.vys} onInput={(event) => { props.setStatus({ vys: event.target.value.trim() }) }} />
                <Input Label="Наименование работы по обработке" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" value={props.values.obr} onInput={(event) => {props.setStatus({ obr: event.target.value.trim() }) }} />
                <Input Label="Наименование работы по сбору урожая" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" value={props.values.sbor} onInput={(event) => { props.setStatus({ sbor: event.target.value.trim() }) }} />
                <Input Label="Длительность (период)" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" value={props.values.period} onInput={(event) => { props.setStatus({ period: event.target.value.trim() }) }} />
                <Input Label="Работник на га" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" value={props.values.workerN} onInput={(event) => { var reg = /^([0-9]*)$/i.test(event.target.value); if (reg) props.setStatus({ workerN: event.target.value.trim() }) }} />
            </Col>
            <Button className="btn btn-primary my-2" style={{ width: "190px" }} onClick={() => {
                if (isFull() == true) props.onClick();
                let digitalModel = {
                    Name: props.data.at(0).name,
                    UserId: -1,
                    ProductId: props.data.at(2).productId
                };
                console.log(CreateTechCard(digitalModel));
            }}>
                <a style={{
                    color: "#fff", textDecoration: 'none'}} href="/models">
                    Создать модель
                </a>
            </Button>
        </BaseCard>
    )


}
export default EconomicCard;