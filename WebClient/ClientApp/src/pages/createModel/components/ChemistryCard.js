import './CardsForDashboard.css';
import React from "react";
import BaseCard from "./BaseCard";
import Combobox from '../../../components/combobox/ComboBox';
import {Col, Container, Row} from "reactstrap/lib";
import {Button} from "reactstrap";
const ChemistryCard = (props) => {
    const chem = ["Выберите хим.средство...", "аа", "=="]
    const pest = ["Выберите пестициды...", "аа"]
    const ud = ["Выберите удобрения...", "==", "аа"]
    const xxx = ["Выберите тип почвы ...", "аа"]
    const isFull = () => {
        if (props.values === null || props.values === undefined) {
        }
        return !Object.keys(props.values).map(val => props.values[val]).some(function (value, index, array) { return (value === false || value === 0 || value === "" || value === undefined) })
    }
    return (
        <BaseCard visible={props.visible} off={props.off} hText="Статус тех.карты" descr="Требуется добавить данные о химических средствах!" notifyColor="#DC3545" >
            <Container className="contButton flex-wrap mx-3" style={{ width:'fit-content' }}>
                <Row>
                    <Col className="px-1 d-flex flex-column justify-content-end">
                        <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Средство хим. защиты" classNameCont="padCombobox " options={chem} onChange={(empty) => { props.setStatus({ chem: empty }) }} />
                        <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Пестициды" classNameCont="padCombobox " options={pest} onChange={(empty) => { props.setStatus({pest: empty }) }} />
                    </Col>
                    <Col className="px-1 d-flex flex-column justify-content-end">
                        <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Удобрения" classNameCont="padCombobox " options={ud} onChange={(empty) => { props.setStatus({ ud: empty }) }} />
                        <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Тип почвы" classNameCont="padCombobox " options={xxx} onChange={(empty) => { props.setStatus({ xxx: empty }) }} />
                    </Col>
                </Row>
                <Row>
                    <Button className="btn btn-primary my-2" style={{ width: "190px" }} onClick={() => { if (isFull() == true) props.onClick(); console.log(isFull()) }}>
                        Далее
                    </Button>
                </Row>
            </Container>
        </BaseCard>
    )
}
export default ChemistryCard;