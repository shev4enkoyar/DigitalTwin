import './TransportSelect.css';
import React from "react";
import './../../../pages/pages.css';
import authService from "../../../components/api-authorization/AuthorizeService";
import Combobox from './../../../components/combobox/ComboBox';
import Input from './../../../components/input/Input';
import BootstrapTable from 'react-bootstrap-table-next';
import { useState, useEffect } from 'react';
import { ThemeContextConsumer } from '../../../components/ThemeContext';
import { Button, Col, Container, Row } from "reactstrap";

const TabForTransportSelect = (props) => {
    
    const [useAddTransp, setUseAddTransp] = useState
        (
            {
                transp: ["Выберите транспорт..."], markTransp: ["Выберите марку транспорта..."], countTransp: "",
                currTransp: "Выберите транспорт...", currMark: "Выберите марку транспорта...", transpData:[]
            }
        )
    const handleSelectTransp = (value) => {
        const prev = useAddTransp;
        setUseAddTransp({ ...prev, ...value })
        console.log(useAddTransp)
    }
    //useEffect(() => {
    //    const GetProducts = async () => {
    //        try {
    //            const token = await authService.getAccessToken();
    //            const response = await fetch('api/transport/get_all', {
    //                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    //            });
    //            let transpTemp = [];
    //            transpTemp.add("Выберите транспорт...");
    //            const data = await response.json();
    //            console.log(data)
    //            data.forEach(el => transpTemp.add(el.name));
    //            handleSelectTransp({ transpData: data, transp: transpTemp });

    //        }
    //        catch (e) {
    //            //console.log(e)
    //        }
    //    }
    //    GetProducts().catch(console.error);
    //});
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const token = await authService.getAccessToken();
                const response = await fetch('api/transport/get_all', {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                let transpTemp = [];
                transpTemp.push("Выберите транспорт...");
                data.map(el => transpTemp.push(el.name));
                if (mounted) {
                    handleSelectTransp({ transpData: data, transp: transpTemp });
                }
            } catch (e) {
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);
    //const GetProducts = async () => {
    //    try{
    //        const token = await authService.getAccessToken();
    //        const response = await fetch('api/transport/get_all', {
    //            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    //        });
    //        const data = await response.json();
    //        let transpTemp = new Set();
    //        transpTemp.add("Выберите транспорт...");
    //        data.forEach(el => transpTemp.add(el.name));
    //        handleSelectTransp({ transpData: data, transp:transpTemp });
            
    //    }
    //    catch (e) {
    //        //console.log(e)
    //    }
    //}
    const handleAddingTransp = () => {
        const prev = props.values;
        props.setStatus([...prev, { num: (prev ? prev.length : 0) + 1, name: useAddTransp.currTransp, brand: useAddTransp.currMark, countTransp:useAddTransp.countTransp }])
    }
    const zagForTransp = [
        {
            dataField: 'num',
            text: '#'
        },
        {
            dataField: 'name',
            text: 'Наименование транспорта'
        },
        {
            dataField: 'brand',
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
                            <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Транспорт" classNameCont="forTransp px-1" options={useAddTransp.transp}
                                onChange={(empty) => {
                                    //props.({
                                    //    currTransp: empty
                                    //    /*productId: this.state.productData.find(el => el.name === empty).id*/
                                    //})
                                    handleSelectTransp({ markTransp: ["Выберите марку транспорта..."], currMark: "Выберите марку транспорта..." });
                                    let brand = [];
                                    brand.push("Выберите марку транспорта...");
                                    const temp = useAddTransp.transpData.find(el => el.name === empty);
                                    if (temp) {
                                        brand.push(...(temp.brand.split(',')))
                                    }
                                    console.log(useAddTransp.transpData.find(el => el.name === empty))
                                    //useAddTransp.transpData.forEach(el => {
                                    //    if (el.name.split(';')[0] === empty)
                                    //        brand.push(el.name.split(';')[1]);
                                    //});
                                    handleSelectTransp({ markTransp: brand, currTransp: empty, currMark: "Выберите марку транспорта..." });
                                    console.log({ markTransp: brand, currTransp: empty, currMark: "Выберите марку транспорта..." });
                                }} />
                            <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Марка транспорта" classNameCont="forTransp px-1" options={useAddTransp.markTransp}
                                onChange={
                                    (empty) => {
                                        //props.setStatus({
                                        //    brand: empty,
                                        //    productId: state.productData.find(el => el.name === props.values.name + ';' + empty).id
                                        //})
                                        handleSelectTransp({ currMark: empty })
                                    }} />
                            <Input value={useAddTransp.countTransp} onInput={(event) => { var reg = /^[0-9]*$/i.test(event.target.value); if (reg) handleSelectTransp({ countTransp: event.target.value.trim() }) }} Label="Количество транспорта" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard" contClass="inpContForTransp  px-1" placeholder="0" />
                        </Row>
                        <Col className="d-flex flex-column align-items-center" style={{ marginBottom: '40px' }}>
                            <Button onClick={() => { console.log(useAddTransp); if (!(useAddTransp.currTransp == "Выберите транспорт...") && !(useAddTransp.currMark == "Выберите марку транспорта...") && !(useAddTransp.countTransp == "")) handleAddingTransp() }} className="btn" style={{ margin: '10px 0px' }}>
                                Добавить
                            </Button>
                        </Col>
                        <Container className="ContForHistoryTariff p-0 contForReactTable">
                            <BootstrapTable classes={context.theme + " HistoryTableText"} keyField='num' data={(props.values.length === 0) ? [{ num: "", name: "", brand: "", countTransp: "" }] : props.values} columns={zagForTransp} />
                        </Container>
                        {/*<TableForTariffs classNameTab="margTable" textForTable="Добавленный транспорт" classNamesTD="ForBox" headersForTable={zagForTransp} contentsForTable={(props.values.length === 0) ? [{ num: "", transp: "", markaTranps: "", countTransp: "" }] : props.values} />*/}
                    </Container>
                )
            }
        </ThemeContextConsumer>

    );

}; export default TabForTransportSelect;