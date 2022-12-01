import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row, Modal, ModalHeader, ModalBody, Form, Label, Input, FormText, Table, FormGroup, Button } from "reactstrap";
import authService from "../../components/api-authorization/AuthorizeService";
import { ThemeContextConsumer } from "../../components/ThemeContext";
import './Gantt.css';


import BackIn_Icon from "../../components/sideBarDashboard/BackInModel_Icon";
import DocIcon from "../../components/sideBarDashboard/DocIcon";
import GraphicIcon from "../../components/sideBarDashboard/GraficIcon";
import HistoryPriceIcon from "../../components/sideBarDashboard/HistoryPriceIcon";
import HomePanel_Icon from "../../components/sideBarDashboard/HomePanel_Icon";
import Map_Icon from "../../components/sideBarDashboard/Map_Icon";
import RecIcon from "../../components/sideBarDashboard/RecIcon";
import SensorsIoT from "../../components/sideBarDashboard/SensorsIoT";
import { IconButton } from "../../components/sideBarDashboard/util/IconButton";




import GantGraph from "../../components/gant/gant_component";
import SideBarDashboard from "../../components/sideBarDashboard/SideBarDashboard";


const TaskModal = (props) => {
    const [currentDay, setDay] = useState();
    const [Resources, setResoures] = useState();
    const [navigation, setNav] = useState();
    const [status, setStatus] = useState();
    const [role, setRole] = useState("AGRONOMIST")

    //expenses form states
    const [expenses, setExpenses] = useState([]);
    const [fuel, setFuel] = useState();
    const [ceeds, setCeeds] = useState({ "num": null,"price": null});
    const [fertilizers, setFertilizers] = useState({ "num": null, "price": null });
    const [pesticides, setPesticides] = useState({ "num": null, "price": null });
    const [herbicides, setHerbicides] = useState({ "num": null, "price": null });
    const [formError, setError] = useState(false);

    //UTILS//

    //resources
    const TableRow = (props) => {
        return (
            <tr>
                <td>{props.transport}</td>
                <td>{props.persona}</td>
            </tr>
        )
    }

    //days navigation
    const DayCircle = (props) => {
        let border = ""
        if (props.day == props.current) {
            border = "2px solid #4f86f7";
        }
        
        return (
            <div id="menuitem" style={{ backgroundColor: props.color, cursor: props.cursor, border: border }} onClick={() => { setDay(props.dayIndex) }}>
                <p style={{ color: "white" }} className="text-center my-auto">{props.day}</p>
        </div>)
    }

    function renderDays() {
        let days = [];
        for (let d = 0; d <= props.task.Details.dates.length - 1; d++) {
            let color = "";
            let cursor = "";
            switch (status[d]) {
                case 'done':
                    color = "#47B000";
                    cursor = "pointer";
                    break;
                case 'undone':
                    color = "#DC3545";
                    cursor = "pointer";
                    break;
                case 'late':
                    color = "#FFB722";
                    cursor = "pointer";
                    break;
                case 'active':
                    color = "#848098"
                    cursor = "pointer";
                    break;
                case 'passive':
                    color = "#636072"
                    cursor = "default";
                    break;
            }
            days.push(<DayCircle day={props.task.Details.dates[d].split('/')[1]} color={color} current={props.task.Details.dates[currentDay].split('/')[1]} dayIndex={d} cursor={cursor} />)
        }
        setNav(days)

    }

    async function ChangeStatus (daystatus) {
        const token = await authService.getAccessToken();
        const response = await fetch(`api/task/update_detail/${props.modelId}?taskId=${props.task.taskId}&date=${props.task.Details.dates[currentDay]}&status=${daystatus}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            let stats = status
            stats[currentDay] = daystatus
            setStatus([...status, stats])
        }

    }


    //expenses 
    const ExpensesField = (props) => {
        return (
            <Row className="align-items-end">
                <Col md={6}>
                    <FormGroup>
                        <Label for={props.id + "_num"} >
                            {props.numText}
                        </Label>
                        <Input onChange={(e) => { props.onChange(props.id, e.target.value, "num") }}
                            id="props.id"
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for={props.id + "_price"}>
                            { props.priceText}
                        </Label>
                        <Input onChange={(e) => { props.onChange(props.id, e.target.value, "price") }}
                            id="props.id"
                        />
                    </FormGroup>
                </Col>
            </Row>
            )
    }

    function onFuelChange(name, value, type) {
        let obj = fuel
        let index = name.slice(4)
        console.log("index",index)
        fuel[index][type] = value
        setFuel([...fuel])
    }

    function onExpenseChange(name, value, type) {
        if (name == "ceeds") {
            let obj = ceeds
            obj[type] = value
            setCeeds({ ...ceeds, obj })
        } else if (name == "fertilizers") {
            let obj = fertilizers
            obj[type] = value
            setFertilizers({ ...fertilizers, obj })
        } else if (name == "herbicides") {
            let obj = herbicides
            obj[type] = value
            setHerbicides({ ...herbicides, obj })
        } else if (name == "pesticides") {
            let obj = pesticides
            obj[type] = value
            setPesticides({ ...pesticides, obj })
        }
    }

    async function SendExpenses() {
        let fuel_str = "";
        let ceeds_str = "0;0";
        let fertilizers_str = "0;0";
        let pesticides_str = "0;0";
        let valid = true
        console.log("validatioin", valid);
        for (let f in fuel) {
            if (fuel[f].num && fuel[f].price && !fuel[f].isArray) {
                if (f == 0) {
                    fuel_str += fuel[f].num + ";" + fuel[f].price
                } else {
                    fuel_str += "/" + fuel[f].num + ";" + fuel[f].price
                }
            } else {
                setError(true)
                valid = false
            }
        }
        if (props.task.taskName == "Посев семян") {
            if (ceeds.num && ceeds.price) {
                ceeds_str = ceeds.num + ";" + ceeds.price
            } else {
                setError(true)
                valid = false
            }
        }
        if (props.task.taskName == "Внесение удобрений") {
            if (fertilizers.num && fertilizers.price) {
                fertilizers_str = fertilizers.num + ";" + fertilizers.price
            } else {
                setError(true)
                valid = false
            }
        }
        if (props.task.taskName == "Внесение гербицитов") {
            if (herbicides.num && herbicides.price) {
                pesticides_str = herbicides.num + ";" + herbicides.price
            } else {
                setError(true)
                valid = false
            }
        }
        if (props.task.taskName == "Внесение пестицидов") {
            if (pesticides.num && pesticides.price) {
                pesticides_str = pesticides.num + ";" + pesticides.price
            } else {
                setError(true)
                valid = false
            }
        }
        //console.log(`api/task/update_detail/${props.modelId}?taskId=${props.task.taskId}&date=${props.task.curDate}&fuel=${fuel_str}&seeds=${ceeds_str}&fertilizers=${fertilizers_str}&Pesticides=${pesticides_str}`)
        if (valid) {
            const token = await authService.getAccessToken();
            const response = await fetch(`api/task/update_detail/${props.modelId}?taskId=${props.task.taskId}&date=${props.task.curDate}&fuel=${fuel_str}&seeds=${ceeds_str}&fertilizers=${fertilizers_str}&Pesticides=${pesticides_str}`, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                props.setModal(false)
            }
        }
    }

    //RENDER CALLS//

    useEffect(() => {
        if (currentDay >= 0 && status) {
            renderDays();
        }
    }, [currentDay, status])


    useEffect(() => {
        if (props.task) {
            let day = props.task.Details.dates.findIndex((el) => el == props.task.curDate);
            setDay(day);
            let maxLen = Math.max(props.task.Resources.transport.length, props.task.Resources.personal.length)
            let reses = [];
            let expenses = [];
            let defFuel = [];
            for (let l = 0; l <= maxLen - 1; l++) {
                reses.push(<TableRow transport={props.task.Resources.transport[l]} persona={props.task.Resources.personal[l]} />)
                expenses.push(<ExpensesField id={"fuel" + l} numText={"Потрачено топлива для " + props.task.Resources.transport[l] + ", литр"} priceText={"Цена в рублях"} onChange={onFuelChange} />)
                defFuel.push({ "num": null, "price": null })
            }
            setFuel(defFuel)
            setResoures(reses);
            setStatus(props.task.Details.status);
            if (props.task.taskName == "Посев семян") {
                expenses.push(<ExpensesField id={"ceeds"} numText={"Использовано посадочного материала"} priceText={"Цена в рублях"} onChange={onExpenseChange} />)
            }
            if (props.task.taskName == "Внесение удобрений") {
                expenses.push(<ExpensesField id={"fertilizers"} numText={"Использовано удобрений, кг/га"} priceText={"Цена в рублях"} onChange={onExpenseChange} />)
            }
            if (props.task.taskName == "Внесение гербицитов") {
                expenses.push(<ExpensesField id={"herbicides"} numText={"Использовано гербицитов, 1 шт/га"} priceText={"Цена в рублях"} onChange={onExpenseChange} />)
            }
            if (props.task.taskName == "Внесение пестицидов") {
                expenses.push(<ExpensesField id={"pesticides"} numText={"Использовано пестицидов, 1 шт/га"} priceText={"Цена в рублях"} onChange={onExpenseChange} />)
            }
            setExpenses(expenses);
        }
    }, [props])



    return (
        <ThemeContextConsumer>
            {context => (
                <Modal isOpen={props.showModal} toggle={() => { props.setModal(false) }} contentClassName={context.theme + " task"}>
                    {props.task &&
                        <>
                        <ModalHeader className={context.theme} toggle={() => { props.setModal(false) }}>{props.task.taskName}</ModalHeader>
                        <ModalBody className={context.theme} style={{maxHeight: "80vh", overflowY: "auto"}}>
                            <h3 style={{ fontSize: "18px" }}>Задействованные ресурсы</h3>
                            <Table className={context.theme  + " white"}>
                                    <thead>
                                        <tr>
                                            <th>
                                                Транспорт
                                            </th>
                                            <th>
                                                Персонал
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Resources}
                                    </tbody>
                                </Table>
                                {currentDay >= 0 &&
                                    <>
                                        {props.task.role == "AGRONOMIST" ?
                                            <>
                                                {
                                                    status[currentDay] == "active" &&
                                                    <>
                                                        <h3 style={{ fontSize: "18px" }}>Статус выполнения задачи за день</h3>
                                                        <Row style={{ paddingLeft: "1rem" }}>
                                                    <Button color="success" style={{ marginRight: "5px" }} onClick={() => { ChangeStatus("done")} }>Выполнена</Button>
                                                    <Button color="warning" style={{ marginRight: "5px" }} onClick={() => { ChangeStatus("late") }}>Выполнена с опозданием</Button>
                                                    <Button color="danger" onClick={() => { ChangeStatus("undone") }}>Не выполнена</Button>
                                                        </Row>
                                            </>
                                            /*<h3 className="text-center" style={{ color: "green", fontSize: "18px" }}>Статус дня изменён</h3>*/
                                                }
                                            </>
                                    : props.task.role == "ECONOMIST" ?
                                                <>
                                            {status[currentDay] == "done" && props.task.Details.Expenses[currentDay].Fuels[0].num !== 0 || status[currentDay] == "late" && props.task.Details.Expenses[currentDay].Fuels[0].num == 0 ?
                                                        <>
                                                            <h3 style={{ fontSize: "18px" }}>Затраты</h3>
                                                            <Form>
                                                        {expenses}
                                                        {formError && <p style={{ color: "red" }} className="text-center">Необходимо заполнить все поля</p>}
                                                        <Row className="justify-content-center">
                                                                <Button color="primary" style={{ marginTop: "5px" }} onClick={() => { SendExpenses() }}>Отправить</Button>
                                                            </Row> 
                                                    </Form>
                                                        </>
                                                        : null
                                               /* <h3 className="text-center" style={{ color: "green", fontSize: "18px" }}>Затраты за день успешно отправлены</h3>*/
                                                }
                                                </> : null}
                                        <p className="text-center mt-3">{props.task.curDate}</p>
                                        <Row className="justify-content-center">
                                            {navigation}
                                        </Row>
                                    </>}
                            </ModalBody>
                        </>
                    }
                </Modal>
        )}
        </ThemeContextConsumer>
    )
}


function GanttMain(props) {

    const [showModal, setModal] = useState(false);
    const [taskData, setData] = useState()


    let {modelId} = useParams()


    let iconsLeftBar = [
        new IconButton("/dashboard", "Главная панель",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/map/", "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("/docs", "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("/iot", "Датчики IoT",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/recommendation", "Рекомендации",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("#nogo", "История цен",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("#/", "График работ",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/models", "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ];

    async function getTask(task) {
        const token = await authService.getAccessToken();
        const response = await fetch(`api/task/get_Details/${task.id}`, {   
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        console.log(data);
        setData(data);
        setModal(true);
    }


    return (
    <ThemeContextConsumer>
        {context => (

        <>
        {console.log("id",modelId) }
        {props.height ? null : <SideBarDashboard icons={iconsLeftBar} />}
        <Container fluid style={{ height: "100%", padding: "0", margin: "0" }} className={context.theme}>
        <GantGraph getTask={getTask} height={props.height? props.height : null} />
                    </Container>
        <TaskModal showModal={showModal} setModal={setModal} task={taskData} modelId={modelId} />
            </>
        )}
    </ThemeContextConsumer>
    )
}

export default GanttMain;
