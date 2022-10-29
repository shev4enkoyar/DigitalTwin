import './CardsForDashboard.css';
import React from "react";
import BaseCard from "./BaseCard";
import {Container} from "reactstrap";
import {Button} from "reactstrap/lib";
const TransportCard = (props) => {
    return (
        <BaseCard visible={props.visible} off={props.off} hText="Статус модели" descr="Требуется добавить технику!" notifyColor="#DC3545" >
            <Container style={{ display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                <Button onClick={() => { props.setStatus({isActive:true}) }} className="btn btn-primary my-2" style={{ width: "190px" }} >
                    Выбрать
                </Button>
            </Container>
            <Container className="contButton">
                <Button className="btn btn-primary my-2" style={{ width: "190px" }} onClick={() => { console.log(props.values.zasev.length, props.values.obrabotka.length, props.values.sbor.length); if ((props.values.zasev.length>0) && (props.values.obrabotka.length>0) && (props.values.sbor.length>0)) props.onClick() }}>
                    Далее
                </Button>
            </Container>
        </BaseCard>
    )
}
export default TransportCard;