import React, { useState, useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, Col, Container, Row } from "reactstrap/lib";
import Combobox from '../../../components/combobox/ComboBox';
import Input from '../../../components/input/Input';
import { ThemeContextConsumer } from '../../../components/ThemeContext';
import './CardsForDashboard.css';
import authService from "./../../../components/api-authorization/AuthorizeService";
const TabForWorkers = (props) => {
    const dol = ["Выберите должность...", "тракторист",]

    const [useAddWorker, setUseAddWorker] = useState
        (
            { dol: -1, stavk: "", oklad: "", vak: "", workers: [] }
        )
    const handleSelectWorker = (value) => {
        const prev = useAddWorker;
        setUseAddWorker({ ...prev, ...value })
        console.log(useAddWorker)
    }
    const handleAddingWorker = () => {
        const prev = props.values;
        props.setStatus([...prev, { num: (prev ? prev.length : 0) + 1, ...useAddWorker }])
            (async () => {
                try {
                    const token = await authService.getAccessToken();
                    const response = await fetch(`api/worker/create?modelId=${props.}&postId=${postId}&fio=${fio}&rate=${rate}&salary=${salary}`, {
                        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                    });
                    console.log(33333);
                    const data = await response.json();
                    console.log(11111);
                    console.log(data);
                    let workerTemp = [];
                    workerTemp.push({ id: -1, post: "Выберите должность..." });
                    data.map(el => workerTemp.push(el));
                    console.log(workerTemp);
                    if (mounted) {
                        handleSelectWorker({ workers: workerTemp });
                    }

                } catch (e) {
                    console.log(e);
                }
            })();
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
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const token = await authService.getAccessToken();
                const response = await fetch('api/worker/get_posts', {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                console.log(33333);
                const data = await response.json();
                console.log(11111);
                console.log(data);
                let workerTemp = [];
                workerTemp.push({ id: -1, post: "Выберите должность..." });
                data.map(el => workerTemp.push(el));
                console.log(workerTemp);
                if (mounted) {
                    handleSelectWorker({ workers: workerTemp });
                }
                
            } catch (e) {
                console.log(e);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);
    return (
        <ThemeContextConsumer>
            {
                context => (
                    <Container className="tabForTransp">
                        <Row id="rowForTab" className="d-flex justify-content-center">
                            <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Должность" classNameCont="forTransp px-1" options={useAddWorker.workers.map(el=>el.post)} 
                                onChange={(empty) => {
                                    const temp = useAddWorker.workers.find(el => el.post === empty);
                                    if (temp) {
                                        handleSelectWorker({dol:temp.post});
                                    }
                                }} />
                            <Input value={useAddWorker.stavk} onInput={(event) => { var reg = /^(0|([1-9][0-9]{0,5}))?(\.|(\.[0-9]{1,5}))?$/i.test(event.target.value); if (reg) handleSelectWorker({ stavk: event.target.value.trim() }) }} Label="Ставка" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard" contClass="inpContForTransp  px-1" placeholder="0" />
                            <Input value={useAddWorker.oklad} onInput={(event) => { var reg = /^(0|([1-9][0-9]{0,5}))?(\.|(\.[0-9]{1,5}))?$/i.test(event.target.value); if (reg) handleSelectWorker({ oklad: event.target.value.trim() }) }} Label="Оклад" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard" contClass="inpContForTransp  px-1" placeholder="0" />
                            <Input value={useAddWorker.vak} onInput={(event) => { handleSelectWorker({ vak: event.target.value }) }} Label="ФИО (либо наименование вакансии)" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard" contClass="inpContForTransp  px-1" placeholder="0" />
                        </Row>
                        <Col className="d-flex flex-column align-items-center" style={{ marginBottom: '40px' }}>
                            <Button onClick={() => { console.log(useAddWorker); if (!(useAddWorker.dol == "Выберите должность...") && !(useAddWorker.stavk == "") && !(useAddWorker.oklad == "") && !(useAddWorker.vak == "")) handleAddingWorker() }} className="btn" style={{ margin: '10px 0px' }}>
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