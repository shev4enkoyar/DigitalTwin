import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Col, Container, Row } from "reactstrap/lib";
import Combobox from '../../../components/combobox/ComboBox';
import Input from '../../../components/input/Input';
import { ThemeContextConsumer } from '../../../components/ThemeContext';
import './CardsForDashboard.css';
const TabForWorkers = (props) => {
    const dol = ["Выберите должность...", "тракторист",]
    const [useAddWorker, setUseAddWorker] = useState
        (
            { dol: "Выберите должность...", stavk: "", oklad: "", vak: "" }
        )
    const handleSelectWorker = (value) => {
        const prev = useAddWorker;
        setUseAddWorker({ ...prev, ...value })
        console.log(useAddWorker)
    }
    const handleAddingWorker = () => {
        const prev = props.values;
        props.setStatus([...prev, { num: (prev ? prev.length : 0) + 1, ...useAddWorker }])
    }
    const zagForWorker = [
        {
            dataField: 'num',
            text: '#'
        },
        {
            dataField: 'dol',
            text: 'Должность'
        },
        {
            dataField: 'stavk',
            text: 'Ставка'
        },
        {
            dataField: 'oklad',
            text: 'Оклад'
        },
        {
            dataField: 'vak',
            text: 'ФИО (либо наименование вакансии)'
        }
    ];
    return (
        <ThemeContextConsumer>
            {
                context => (
                        <Container className="contButton flex-wrap mx-3" style={{ width: 'fit-content' }}>
                            <Row id="rowForTab" className="d-flex justify-content-center">
                                <Combobox onChange={(value) => { handleSelectWorker({ dol: value }) }} className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Должность" classNameCont="forTransp px-1" options={dol} />
                                <Input value={useAddWorker.stavk} onInput={(event) => { var reg = /^(0|([1-9][0-9]{0,5}))?(\.|(\.[0-9]{1,5}))?$/i.test(event.target.value); if (reg) handleSelectWorker({ stavk: event.target.value.trim() }) }} Label="Ставка" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard" contClass="inpContForTransp  px-1" placeholder="0" />
                                <Input value={useAddWorker.oklad} onInput={(event) => { var reg = /^(0|([1-9][0-9]{0,5}))?(\.|(\.[0-9]{1,5}))?$/i.test(event.target.value); if (reg) handleSelectWorker({ oklad: event.target.value.trim() }) }} Label="Оклад" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard" contClass="inpContForTransp  px-1" placeholder="0" />
                                <Input value={useAddWorker.vak} onInput={(event) => { handleSelectWorker({ vak: event.target.value.trim() }) }} Label="ФИО (либо наименование вакансии)" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard" contClass="inpContForTransp  px-1" placeholder="0" />
                            </Row>
                            <Col className="d-flex flex-column align-items-center" style={{ marginBottom: '40px' }}>
                                <Button onClick={() => { console.log(useAddWorker); if (!(useAddWorker.dol == "Выберите транспорт...") && !(useAddWorker.stavk == "") && !(useAddWorker.oklad == "") && !(useAddWorker.vak == "")) handleAddingWorker() }} className="btn" style={{ margin: '10px 0px' }}>
                                    Добавить
                                </Button>
                            </Col>
                            <Container className="ContForHistoryTariff p-0 contForReactTable">
                                <BootstrapTable classes={context.theme + " HistoryTableText"} keyField='num' data={(props.values.length === 0) ? [{ num: "", dol: "", stavk: "", oklad: "", vak: "" }] : props.values} columns={zagForWorker} />
                            </Container>
                            {/*<TableForTariffs classNameTab="margTable" textForTable="Добавленный транспорт" classNamesTD="ForBox" headersForTable={zagForWorker} contentsForTable={(props.values.length === 0) ? [{ num: "", dol: "", stavk: "", oklad: "", vak: """ }] : props.values} />*/}
                        </Container>
                )
            }
        </ThemeContextConsumer>
    );
}
export default TabForWorkers;