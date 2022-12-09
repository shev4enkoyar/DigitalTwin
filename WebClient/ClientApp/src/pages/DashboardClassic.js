import React, { Component, useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Col, Container, Row } from "reactstrap";
import authService from "../components/api-authorization/AuthorizeService";
import Input from '../components/input/Input';
import './pages.css';
import { ThemeContextConsumer } from '../components/ThemeContext';

export const DashboardClassic = (props) => {

    const [state, setState] = useState(
        {
            first: { cult: "Пшеница", sort: "Екатерина", square: 22.00, norma: 0.0 }, second: { frac: 0, thic: 0, harv: 18, weight: 20 }, third: { gros: 396, fund: 1461.4, labor: 1.58, cost: 7307, price: 12420 },
            works: [{ task: "", date: "", amount: 22, refAmount: 27, brand: "", staff: "" }],
        }
    );
    //const state = {
    //    first: { cult: "Пшеница", sort: "Екатерина", square: 22.00, norma: 0.0 }, second: { frac: 0, thic: 0, harv: 18, weight: 20 }, third: { gros: 396, fund: 1461.4, labor: 1.58, cost: 7307, price: 12420 },
    //    works: [{ task: "", date: "", amount: 22, refAmount: 27, brand:"", staff: "" }],
    //}
    const headers = {
        cult: "Культура", sort: "Сорт", square: "Площадь", norma: "Норма высева", frac: "Фракция", thic: "Густота", harv: "Урожай", weight: "Вес этапов",
        works: { task: "Наименование работы", date: "Агро сроки проведения работ", volume: { name: "Объем работ", amount: "В физических га", refAmount: "В эталонных га" }, unit: { name: "Состав агрегата", brand: "Марка трактора" }, staff: { name: "Обслуживающий персонал", staff: "Рабочих" } }
    }
    const economHeaders = [{ dataField: "gros", text: "Валовой сбор, г" }, { dataField: "fund", text: "Затраты средств руб./га" }, { dataField: "labor", text: "Затраты труда, чел.ч/га" }, { dataField: "cost", text: "Себестоимость, руб./т" }, { dataField: "price", text: "Стоимость, руб./т" }]
    const workHeaders = [{ dataField: "task", text: "Наименование работы" }, { dataField: "date", text: "Агро сроки проведения работ" }, { dataField: "amount", text: "В физических га" }, { dataField: "refAmount", text: "В эталонных га" }, { dataField: "brand", text: "Марка трактора" }, { dataField: "staff", text: "Рабочих" }]
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                console.log(5553444);
                const token = await authService.getAccessToken();
                console.log(77444);
                const response = await fetch(`api/task/get_all/${props.modelId}`, {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                console.log(3444);
                const task = await response.json();
                console.log(task);
                let taskTemp = [];
                await Promise.all(task.map(async(el) => {
                    
                    console.log(el.id);
                    const taskResponse = await fetch(`api/task/get_details/${el.id}`, {
                        headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                    });
                    
                    const taskDetails = await taskResponse.json();
                    console.log(taskDetails)
                    const staff = taskDetails.Resources.personal
                    console.log(staff)
                    var dict = {}
                    staff.forEach((el, index) => {
                        console.log("111")
                        const temp = el.split(" - ")
                        const temp1 = temp[0].split(";")
                        const temp2 = temp[1].split(";")
                        
                        temp1.forEach((t, ind) => {
                            if (dict[t] === undefined) {
                                dict[t] = parseInt(temp2[ind], 10)
                                console.log(temp2[ind])
                            }
                            else {
                                dict[t] = dict[t] + parseInt(temp2[ind], 10)
                                console.log(temp2[ind])
                            }
                            
                        })
                    });
                    console.log(dict)
                    let wokers = []
                    Object.keys(dict).forEach((key, ind) => { wokers.push(`${key} - ${dict[key]}`) })
                    console.log(taskDetails.Details.dates[taskDetails.Details.dates.length - 1])
                    const razn = new Date(taskDetails.Details.dates[taskDetails.Details.dates.length - 1]).getMonth() - new Date(taskDetails.Details.dates[0]).getMonth()
                    console.log(wokers)
                    taskTemp.push({
                        "task": taskDetails.taskName,
                        "date": razn == 0 ? 1 : razn,
                        "amount": 0,
                        "refAmount": 0,
                        "brand": taskDetails.Resources.transport.join(", "),
                        "staff":wokers.join("; ")

                    });
                    console.log(1)
                    console.log(taskTemp);
                }));
                console.log(taskTemp);
                const resp = await fetch(`api/techcard/get_all`, {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                const res = await resp.json();
                console.log(res)
                console.log(props.modelId)
                const tech = res.find((tech) => `${tech.id}` === props.modelId)
                console.log(tech)
                const prodName = tech.productName.split(";")
                console.log(1)
                //const response1 = await fetch(`api/models`, {
                //    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                //});
                //const prod = await response1.json();
                //console.log(prod);
                let prodTemp = [];
                prodTemp.push({ cult: prodName[0], sort: prodName[1], square: 22.00, norma: 0.0 });
                const fract = { frac: tech.fraction, thic: tech.density, harv: 18, weight: 20 }
/*                prod.map(el => prodTemp.push(el));*/
                console.log(prodTemp);
                if (mounted) {
                    const prevState = state;
                    setState({ ...state, works: taskTemp, first: prodTemp[0], second:fract }) ;
                }
                const response2 = await fetch(`api/digitalmodels/get_all`, {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                const transp = await response2.json();
                console.log(transp)
                let transpTemp = [];
                transpTemp.push("");
                data.map(el => transpTemp.push(el.name));
                if (mounted) {
                    handleSelectTransp({ transp: transp, brand: brand, staff: staff, transp: transpTemp });
                }
            } catch (e) {
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
                    <Container className="d-flex flex-column" style={{ maxWidth: '100%' }}>
                        <Row className="m-5 justify-content-around">
                            <Col className="col col-md-2 p-1 d-flex flex-column align-items-center mx-2">
                                {Object.entries(state.first).map(([key, value]) =>
                                    <Input disabled classNameP={context.theme + "Gray textForSign14 text-white my-0 mx-1 text-right"} className="input fixWidthInp" Label={headers[key]} contClass="d-flex align-items-center my-1 mx-0 justify-content-end" value={value} readOnly={true} />
                                )
                                }
                            </Col>
                            <Col className="col col-md-2 p-1 d-flex flex-column align-items-center mx-2">
                                {Object.entries(state.second).map(([key, value]) =>
                                    <Input disabled classNameP={context.theme + "Gray textForSign14 text-white my-0 mx-1 text-right"} className="input fixWidthInp" Label={headers[key]} contClass="d-flex align-items-center my-1 mx-0 justify-content-end" value={value} readOnly={true} />
                                )
                                }
                            </Col>
                            <Col className="contForReactTable p-1 d-flex align-items-center mx-2">
                                <BootstrapTable classes={context.theme + "Gray textBitter"} keyField="gros" data={[state.third,]} columns={economHeaders} />
                            </Col>
                        </Row>
                        <Row className="m-5">
                            <Col className="contForReactTable p-1 d-flex align-items-center mx-2">
                                <BootstrapTable classes={context.theme + "Gray textBitter"} keyField="name" data={state.works} columns={workHeaders} />
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </ThemeContextConsumer>
    )
}; 