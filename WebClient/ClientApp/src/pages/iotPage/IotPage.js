import React, { Component } from 'react';
import { Col, Container, Row } from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import CardForBody from '../../components/cardForBody/CardForBody';
import Input from '../../components/input/Input';
import SideBarDashboard from "../../components/sideBarDashboard/SideBarDashboard";
import { IconButton } from "../../components/sideBarDashboard/util/IconButton";
import { ThemeContextConsumer } from "../../components/ThemeContext";
import '../pages.css';
class IotPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosen: -2, newName:"",newFunc:[], isAdded: false, sensors: [
                { id: 1, status: "online", color:"success", name: "IoT 001", func: [1, 3], link: "temp", dateAdd:"21.08.2020" },
                { id: 2, status: "ofline", color: "danger", name: "IoT 002", func: [2, 4], link: "temp", dateAdd: "15.05.2020" },
                { id: 3, status: "online", color: "success", name: "IoT 003", func: [1, 5], link: "temp", dateAdd: "18.09.2020" },
                { id: 4, status: "online", color: "success", name: "IoT 004", func: [3, 4], link: "temp", dateAdd: "24.10.2020" },
                { id: 5, status: "online", color: "success", name: "IoT 005", func: [1, 4], link: "temp", dateAdd: "21.12.2020" }
            ]
        }
    };
    iconsLeftBar = [
        new IconButton("#/", "Главная панель",
            <img style={{ width: "25px", height: "25px", margin:"7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/map/" + this.props.match.params.modelId, "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("/docs", "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("#nogo", "Датчики IoT",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/recommendation", "Рекомендации",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("#nogo", "История цен",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("/gan", "График работ",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/models", "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ];
    handleBlocked = (value) => {
        this.setState({
            chosen: value,
            isAdded:false
        })
    };
    handleAdded = () => {
        this.setState({
            isAdded:true
        })
    }
    handleNewName=(value)=>{
        this.setState({ newName: value })
    }

    functName = [
        {
            id: 1,
            name: 'Температура воздуха',
            g:"30°С"
        },
        {
            id: 2,
            name: 'Влажность воздуха',
            g: "25кг/м^3"
        },
        {
            id: 3,
            name: 'Атмосферное давление',
            g: "760мм рт.ст."
        },
        {
            id: 4,
            name: 'Температура почвы',
            g: "10°С"
        },
        {
            id: 5,
            name: 'Влажность почвы',
            g: "54%"
        },
    ];
    render() {


        return (
            <ThemeContextConsumer>{
                context => (
                    <>
                        <SideBarDashboard icons={this.iconsLeftBar} />
                        <Container className={context.theme + "Gray " + "p-0 flex-wrap position-absolute d-flex "} style={{ width: '86%', marginLeft: '11%', marginRight:'3%' }}>
                            <Row className="h-100 w-100 m-0">
                                <Col className="col-md-3 col d-flex">
                                    <CardForBody styleForCard={{ minWidth: '100%', margin:'20px' }} classForContB="d-flex flex-column align-items-center" styleTextForCard={{ padding: '5%', minWidth: '100%' }}>
                                        <h5 style={{ fontFamily: 'Bitter', margin: '10px 0px 0px 0px' }} className="d-flex text-center">
                                            Сенсоры
                                        </h5>
                                        <button className="btn btn-primary my-3" onClick={() => { this.handleBlocked(-1) }}>
                                            Добавить новый
                                        </button>
                                        {
                                            this.state.sensors.map(
                                                sensor =>
                                                    <label onClick={() => { this.handleBlocked(sensor.id) }} className={"nameIot" + context.theme +" m-0 text-center "} style={{ border: '#4A4A4A solid 1px', padding: '5%', width: 'inherit' }}>
                                                        {sensor.name}
                                                    </label>
                                            )
                                        }
                                    </CardForBody>
                                </Col>
                                <Col className="col-md-8 col d-flex">
                                    <CardForBody styleForCard={{ minWidth: '100%', margin: '20px' }} classForContB="d-flex flex-column align-items-center" styleTextForCard={{ padding: '1%', minWidth: '100%' }}>
                                        <Container className="d-flex">
                                            <h5 style={{ fontFamily: 'Bitter', margin: '10px 0px 30px 0px', width: '100%' }} className="d-flex text-left">
                                                Подключить новый сенсор
                                            </h5>
                                            <p className={"text-" + (this.state.chosen > 0 ? this.state.sensors.find(sensor => sensor.id === this.state.chosen).color : "") }>
                                                {this.state.chosen > 0 ? this.state.sensors.find(sensor => sensor.id === this.state.chosen).status : ""}
                                            </p>
                                        </Container>
                                        <Container>
                                            <Input disabled={(!(this.state.chosen === -1 && this.state.isAdded === false))} value={this.state.chosen > 0 ? this.state.sensors.find(sensor => sensor.id === this.state.chosen).name : this.state.newName} onInput={(event) => { if ((this.state.chosen === -1 && this.state.isAdded === false)) this.handleNewName(event.target.value.trim()) }} classNameP="textForSign16" className="input" Label="Псевдоним устройства" styleContainer={{ minWidth: '20%', width: '50%' }}>
                                                <div>
                                                    &nbsp;
                                                </div>
                                                <p className="hintIot text-warning  m-0"/>
                                            </Input>
                                        </Container>
                                        <Container className="d-flex p-0" style={{ minWidth: '20%', width: '50%' }}>
                                            <p style={{ fontFamily: 'Open Sans', fontSize: '12px', width: '100%' }}>
                                                Дата добавления: 
                                            </p>
                                            <p style={{ fontFamily: 'Open Sans', fontSize: '12px', width: '100%' }} className="d-flex justify-content-end">
                                                {this.state.chosen < 0 ? (new Date()).toLocaleDateString() : this.state.sensors.find(sensor => sensor.id === this.state.chosen).dateAdd}
                                             </p>
                                        </Container>

                                        {this.state.chosen > 0 && this.state.sensors.find(sensor => sensor.id === this.state.chosen).status === "ofline" ?
                                            <p className="text-danger">
                                                Нарушена связь или проблемы с питанием
                                            </p>
                                            :
                                            <Row className="align-items-center" style={{ width: '83%' }}>
                                                {
                                                    this.functName.map(
                                                        functName =>
                                                            <Col className="d-flex justify-content-center m-2">
                                                                <input disabled={(!(this.state.chosen === -1 && this.state.isAdded === false))} className="position-relative" style={{left:"0px"}} checked={this.state.chosen > 0 ? this.state.sensors.find(sensor => sensor.id === this.state.chosen).func.includes(functName.id) : null} type="checkbox" />
                                                                <p style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#616161', width: 'max-content' }} className="m-0 ml-1">
                                                                    {functName.name}
                                                                </p>
                                                            </Col>
                                                    )
                                                }
                                            </Row> 
                                        }
                                        <button className="btn btn-primary mt-5" hidden={(!(this.state.chosen === -1 && this.state.isAdded === false))} onClick={this.handleAdded}>
                                            Добавить
                                        </button>
                                        <div className="text-center" hidden={(!(this.state.chosen === -1 && this.state.isAdded === false))} >
                                            <a style={{ color: '#F5CA5D', textDecoration: 'auto', fontSize: '85%' }} href="/models">
                                                Инструкция по добавлению устройств
                                            </a>
                                        </div>
                                        <Input disabled={(!(this.state.chosen === -1 && this.state.isAdded === false))} value={this.state.chosen > 0 ? this.state.sensors.find(sensor => sensor.id === this.state.chosen).name : this.state.newName} onInput={(event) => { if ((this.state.chosen === -1 && this.state.isAdded === false)) this.handleNewName(event.target.value.trim()) }} classNameP="textForSign16" className="input" Label="Ссылка для добавления" hidden={this.state.isAdded === false} />
                                    </CardForBody>
                                </Col>
                            </Row>
                        </Container>
            </>
                )
            }
            </ThemeContextConsumer>
        );
    }
} export default IotPage;