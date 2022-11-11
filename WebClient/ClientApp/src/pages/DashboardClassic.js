import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Col, Container, Row } from "reactstrap";
import Input from '../components/input/Input';
import './pages.css';
import { ThemeContextConsumer } from '../components/ThemeContext';

class DashboardClassic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: { cult: "Пшеница", sort: "Екатерина", square: 22.00, norma: 0.0 }, second: { frac: 0, thic: 0, harv: 18, weight: 20 }, third: { gros: 396, fund: 1461.4, labor: 1.58, cost: 7307, price: 12420 },
            works: {name: "Уборка прямое комбайнирование", period: 9, amount: 22,  refAmount: 27, track: "Донн-", tire: "ЖВН - 7",  drivers: 1,  workers: 5 }, 
                //{ name: "Транспортировка зерна поле - ток", period: 9, amount: 36, refAmount: 65, track: "Урал", tire: "ПТС - 9", drivers: 1, workers: 3 }
            
        }
    }
    headers = {
        cult: "Культура", sort: "Сорт", square: "Площадь", norma: "Норма высева", frac: "Фракция", thic: "Густота", harv: "Урожай", weight: "Вес этапов",
        works: { name: "Наименование работы", period: "Агро сроки проведения работ", volume: { name: "Объем работ", amount: "В физических га", refAmount: "В эталонных га" }, unit: { name: "Состав агрегата", track: "Марка трактора", tire: "Марка шин" }, staff: { name: "Обслуживающий персонал", drivers: "Трактористов", workers: "Рабочих" } }
    }
    economHeaders = [{ dataField: "gros", text: "Валовой сбор, г" }, { dataField: "fund", text: "Затраты средств руб./га" }, { dataField: "labor", text: "Затраты труда, чел.ч/га" }, { dataField: "cost", text: "Себестоимость, руб./т" }, { dataField: "price", text: "Стоимость, руб./т" }]
    workHeaders = [{ dataField: "name", text: "Наименование работы" }, { dataField: "period", text: "Агро сроки проведения работ" }, { dataField: "amount", text: "В физических га" }, { dataField: "refAmount", text: "В эталонных га" }, { dataField: "track", text: "Марка трактора" }, { dataField: "tire", text: "Марка шин" }, { dataField: "drivers", text: "Трактористов" }, { dataField: "workers", text: "Рабочих" }]
    render() {
        return (
            <ThemeContextConsumer>
                {
                    context=>(
                            <Container className="d-flex flex-column" style={{maxWidth:'100%'} }>
                                <h2 className={context.theme + "Gray text-white font-weight-lighter mx-5 my-2"}>
                                    Технологическая карта
                                </h2>
                                <Row className="m-5 justify-content-around">
                                    <Col className="col col-md-2 p-1 d-flex flex-column align-items-center mx-2">
                                        {Object.entries(this.state.first).map(([key, value]) => 
                                            <Input disabled classNameP={context.theme + "Gray textForSign14 text-white my-0 mx-1 text-right"} className="input fixWidthInp" Label={this.headers[key]} contClass="d-flex align-items-center my-1 mx-0 justify-content-end" value={value} readOnly={true}></Input>
                                        )
                                        }
                                    </Col>
                                    <Col className="col col-md-2 p-1 d-flex flex-column align-items-center mx-2">
                                        {Object.entries(this.state.second).map(([key, value]) => 
                                            <Input disabled classNameP={context.theme + "Gray textForSign14 text-white my-0 mx-1 text-right"} className="input fixWidthInp" Label={this.headers[key]} contClass="d-flex align-items-center my-1 mx-0 justify-content-end" value={value} readOnly={true}></Input>
                                        )
                                        }
                                    </Col>
                                    <Col className="contForReactTable p-1 d-flex align-items-center mx-2">
                                        <BootstrapTable classes={context.theme + "Gray textBitter"} keyField="gros" data={[this.state.third,]} columns={this.economHeaders} />
                                    </Col>
                                </Row>
                                <Row className="m-5">
                                    <Col className="contForReactTable p-1 d-flex align-items-center mx-2">
                                    <BootstrapTable classes={context.theme + "Gray textBitter"} keyField="name" data={[this.state.works,]} columns={this.workHeaders} />
                                    </Col>
                                </Row>
                            </Container>
                    )
                }
            </ThemeContextConsumer>
        );
    }
} export default DashboardClassic;