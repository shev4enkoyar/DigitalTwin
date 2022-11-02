import React, { useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Col, Container, Row } from "reactstrap/lib";
import { ThemeContextConsumer } from '../../../components/ThemeContext';
import Combobox from './../../../components/combobox/ComboBox';
import Input from './../../../components/input/Input';
import './../../../pages/pages.css';
import './TransportSelect.css';
const TabForTransportSelect = (props) => {
    const transport = ["Выберите транспорт...", "Трактор",]
    const markaTrans = ["Выберите марку транспорта...", "1213",]
    const [useAddTransp, setUseAddTransp] = useState
        (
            { transp: "Выберите транспорт...", markTransp: "Выберите марку транспорта...", countTransp: "" }
        )
    const handleSelectTransp = (value) => {
        const prev = useAddTransp;
        setUseAddTransp({ ...prev, ...value })
        console.log(useAddTransp)
    }
    const handleAddingTransp = () => {
        const prev = props.values;
        props.setStatus([...prev, { num: (prev ? prev.length : 0) + 1, ...useAddTransp }])
    }
    const zagForTransp = [
        {
            dataField: 'num',
            text: '#'
        },
        {
            dataField: 'transp',
            text: 'Наименование транспорта'
        },
        {
            dataField: 'markTransp',
            text: 'Марка транспорта'
        },
        {
            dataField: 'countTransp',
            text: 'Количество транспорта'
        }
    ];
    return (
        <ThemeContextConsumer>
            {
                context => (
                    <Container className="tabForTransp">
                        <Row id="rowForTab" className="d-flex justify-content-center">
                            <Combobox onChange={(value) => { handleSelectTransp({ transp: value }) }} className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Транспорт" classNameCont="forTransp px-1" options={transport} />
                            <Combobox onChange={(value) => { handleSelectTransp({ markTransp: value }) }} className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Марка транспорта" classNameCont="forTransp px-1" options={markaTrans} />
                            <Input value={useAddTransp.countTransp} onInput={(event) => { var reg = /^[0-9]*$/i.test(event.target.value); if (reg) handleSelectTransp({ countTransp: event.target.value.trim() }) }} Label="Количество транспорта" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard" contClass="inpContForTransp  px-1" placeholder="0" />
                        </Row>
                        <Col className="d-flex flex-column align-items-center" style={{ marginBottom: '40px' }}>
                            <Button onClick={() => { console.log(useAddTransp); if (!(useAddTransp.transp == "Выберите транспорт...") && !(useAddTransp.markTransp == "Выберите марку транспорта...") && !(useAddTransp.countTransp == "")) handleAddingTransp() }} className="btn" style={{ margin: '10px 0px' }}>
                                Добавить
                            </Button>
                        </Col>
                        <Container className="ContForHistoryTariff p-0 contForReactTable">
                            <BootstrapTable classes={context.theme + " HistoryTableText"} keyField='num' data={(props.values.length === 0) ? [{ num: "", transp: "", markaTrans: "", countTransp: "" }] : props.values} columns={zagForTransp} />
                        </Container>
                        {/*<TableForTariffs classNameTab="margTable" textForTable="Добавленный транспорт" classNamesTD="ForBox" headersForTable={zagForTransp} contentsForTable={(props.values.length === 0) ? [{ num: "", transp: "", markaTrans: "", countTransp: "" }] : props.values} />*/}
                    </Container>
                )
            }
        </ThemeContextConsumer>

    );
}; export default TabForTransportSelect;