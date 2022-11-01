import './CardsForDashboard.css';
import React from "react";
import BaseCard from "./BaseCard";
import { Button, Container } from "reactstrap/lib";
const TransportCard = (props) => {
    const warning = () => {
        if ((props.values.rZasev.length > 0) && (props.values.rObrabotka.length > 0) && (props.values.rSbor.length > 0)) {
            return "Данные о работниках сохранены";

        }
        else {
            console.log(((props.values.rZasev.length > 0) ? "" : "Требуется добавить работников для засева\n") + ((props.values.rObrabotka.length > 0) ? "" : "Требуется добавить работников для обработки\n") + ((props.values.rSbor.length > 0) ? "" : "Требуется добавить работников для сбора\n"))
            return (((props.values.rZasev.length > 0) ? "" : "Требуется добавить работников для засева\n") + ((props.values.rObrabotka.length > 0) ? "" : "Требуется добавить работников для обработки\n") + ((props.values.rSbor.length > 0) ? "" : "Требуется добавить работников для сбора\n"))
        }
    }
    return (
        <BaseCard className="widForCult" visible={props.visible} off={props.off} hText="Статус тех.карты" descr={warning()} notifyColor="#DC3545" >
            <Container style={{ display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                <Button onClick={() => { props.setStatus({ isActive: true }) }} className="btn btn-warning my-2" style={{ width: "190px" }} >
                    Выбрать
                </Button>
            </Container>
            <Container className="contButton">
                <Button onClick={() => { props.Back() }} className="btn btn-primary m-2" style={{ width: "190px" }} >
                    Назад
                </Button>
                <Button className="btn btn-primary m-2" style={{ width: "190px" }} onClick={() => { props.onClick() }}>
                    Пропустить
                </Button>
                <Button className="btn btn-primary m-2" style={{ width: "190px" }} onClick={() => { console.log(props.values.rZasev.length, props.values.rObrabotka.length, props.values.rSbor.length); if ((props.values.rZasev.length > 0) && (props.values.rObrabotka.length > 0) && (props.values.rSbor.length > 0)) props.onClick() }}>
                    Далее
                </Button>
            </Container>
        </BaseCard>
    )
}
export default TransportCard;