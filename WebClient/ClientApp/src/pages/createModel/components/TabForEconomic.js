import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Col, Container, Row } from "reactstrap/lib";
import Combobox from '../../../components/combobox/ComboBox';
import Input from '../../../components/input/Input';
import { ThemeContextConsumer } from '../../../components/ThemeContext';
import './CardsForDashboard.css';
const TabForEconomic = (props) => {
    const worker = ["Выберите работника на га...", "тракторист",]
    const [useAddWork, setUseAddWork] = useState
        (
            { nameWork: "", timeWork: "", worker: "Выберите работника на га..." }
        )
    const handleSelectWork = (value) => {
        const prev = useAddWork;
        setUseAddWork({ ...prev, ...value })
        console.log(useAddWork)
    }
    const handleAddingWork = () => {
        const prev = props.values;
        props.setStatus([...prev, { num: (prev ? prev.length : 0) + 1, ...useAddWork }])
    }
    const zagForWork = [
        {
            dataField: 'num',
            text: '#'
        },
        {
            dataField: 'nameWork',
            text: 'Наименование работ'
        },
        {
            dataField: 'timeWork',
            text: 'Длительность (период)'
        },
        {
            dataField: 'worker',
            text: 'Работник на га'
        }
    ];
    return (
        <ThemeContextConsumer>
            {
                context => (
                    <Container className="tabForTransp">
                        <Row id="rowForTab" className="d-flex justify-content-center">
                            <Input value={useAddWork.nameWork} onInput={(event) => { handleSelectWork({ nameWork: event.target.value.trim() }) }} Label="Наименование работ" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard" contClass="inpContForTransp  px-1" placeholder="" />
                            <Input value={useAddWork.timeWork} onInput={(event) => { var reg = /^[0-9]*$/i.test(event.target.value); if (reg) handleSelectWork({ timeWork: event.target.value.trim() }) }} Label="Длительность (период)" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard" contClass="inpContForTransp  px-1" placeholder="" />
                            <Combobox onChange={(value) => { handleSelectWork({ worker: value }) }} className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Работник на га" classNameCont="forTransp px-1" options={worker} />
                        </Row>
                        <Col className="d-flex flex-column align-items-center" style={{ marginBottom: '40px' }}>
                            <Button onClick={() => { console.log(useAddWork); if (!(useAddWork.nameWork == "") && !(useAddWork.timeWork == "") && !(useAddWork.worker == "Выберите работника на га...")) handleAddingWork() }} className="btn" style={{ margin: '10px 0px' }}>
                                Добавить
                            </Button>
                        </Col>
                        <Container className="ContForHistoryTariff p-0 contForReactTable">
                            <BootstrapTable classes={context.theme + " HistoryTableText"} keyField='num' data={(props.values.length === 0) ? [{ num: "", nameWork: "", timeWork: "", worker: "" }] : props.values} columns={zagForWork} />
                        </Container>
                        {/*<TableForTariffs classNameTab="margTable" textForTable="Добавленный транспорт" classNamesTD="ForBox" headersForTable={zagForWork} contentsForTable={(props.values.length === 0) ? [{ num: "", transp: "", markaTrans: "", countTransp: "" }] : props.values} />*/}
                    </Container>
                )
            }
        </ThemeContextConsumer>

    );
}; export default TabForEconomic;