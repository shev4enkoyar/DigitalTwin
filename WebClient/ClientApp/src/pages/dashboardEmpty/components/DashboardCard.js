import { useState } from "react";
import Combobox from './../../../components/combobox/ComboBox';
import Input from './../../../components/input/Input';
import './ContentDashboard.css';
/*import sen_icon from './../data/SensorIoT_Icon.svg';
import map_icon from './../data/Map_Icon.svg';*/
import React from "react";
import { Button, Col, Container } from "reactstrap/lib";
import CardForBody from './../../../components/cardForBody/CardForBody';
export function DashboardCard(props) {
    return (
        <fieldset disabled={props.off ? false : "disabled"} className="cardSize">
                <CardForBody>
                    <Container className="ContForCardDash">
                        <p className="textForStatus" >
                            {props.hText}
                        </p>
                        <Col className="ColForBut">
                            <p className="NeedingText" style={{ color: props.notifyColor }}>
                                {props.descr}
                                <Col style={{ margin: '6px 0px 6px 45px', display: 'flex', justifyContent: 'flex-end' }}>
                                    {props.isBut}
                                </Col>
                            </p>
                        </Col>
                        {props.children}
                    </Container>
                </CardForBody>
        </fieldset>
    );
};
export const HistoryCard = (props) => {
    let isAllOk = false;
    return (
        <DashboardCard hText="Статус модели" descr="Требуется добавить исторические данные!" notifyColor="#DC3545" off={props.off}>
            <Container className="contButton">
                <Button className="blueBut dashBut simpleBut" classTextName="textOpenSans14" >
                    Импортировать
                </Button>
            </Container>
            <div className="Warning" style={{ paddingTop: '7px' }}>Файл импорта должен соответсвовать &zwnj;
                <a style={{ color: '#F5CA5D', textDecorationLine: 'none' }} href="#nogo">
                    шаблону
                </a>
            </div>
            <p className="textForStatus marForDescr" >
                Если модель не имеет исторических данных, нажмите “Начальное состояние”
            </p>
            <Container className="contButton">
                <Button onClick={() => props.isPred()} className="blueBut dashBut simpleBut" classTextName="textOpenSans14" >
                    Начальное состояние
                </Button>
            </Container>
        </DashboardCard>
    )
}
export const CultureCard = (props) => {
    let isAllOk = false;
    const cult = ["Введите наименование культуры...", "Рис", "Овес"]
    const sortForCult = ["Введите сорт культуры...", "cc"]
    const [isState, setState] = useState({ cult: 0, sort: 0, frac: "", gust: "", norm: "", total: "" })
    const isFull = () => {
        if (isState === null || isState === undefined) {
        }
        props.setStatus({ cult: !Object.keys(isState).map(val => isState[val]).some(function (value, index, array) { return (value === false || value === 0 || value === "" || value === undefined) }) })
    }
    const setStateValue = (value) => {
        setState({...isState,...value})
        console.log(isState)
    }
    return (
        <DashboardCard hText="Статус модели" descr="Требуется добавить данные о культуре!" notifyColor="#DC3545" off={props.off}>
            <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Col style={{ marginRight: '1px' }}>
                    <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Культура" classNameCont="padCombobox " options={cult} setInherit={(empty) => {setStateValue({ cult: empty ? 1 : 0 }) }} />
                    <Input Label="Фракция" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" value={isState.frac} onChange={(event) => { setStateValue({ frac: event.target.value.trim() }) }} />
                    <Input Label="Норма высева" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { var reg = /^[0-9]*$/i.test(event.target.value); console.log(reg, props.values); if (reg) setStateValue({ norm: event.target.value.trim() }) }} value={isState.norm} />
                </Col>
                <Col style={{ marginLeft: '1px' }}>
                    <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Сорт" classNameCont="padCombobox " options={sortForCult} setInherit={(empty) => {setStateValue({ sort: empty ? 1 : 0 }) }} />
                    <Input Label="Густота" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" value={isState.gust} onChange={(event) => {setStateValue({ gust: event.target.value.trim() }) }} />
                    <Input Label="Вес этапов" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" value={isState.total} onChange={(event) => {setStateValue({ total: event.target.value.trim() }) }} />
                </Col>
            </Container>
            <Container className="contButton">
                <Button className="blueBut dashBut simpleBut" classTextName="textOpenSans14" onClick={isFull} >
                    Добавить
                </Button>
            </Container>
        </DashboardCard>
    )
}
export const MachineCard = (props) => {
    const techs = ["Введите технику..."];
    
    return (
        <DashboardCard off={props.off} hText="Статус модели" descr="Требуется добавить технику!" notifyColor="#DC3545" >
            <Container style={{ display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                <Button onClick={() => { props.handleActiveChanged(true) }} className="blueBut dashBut simpleBut" classTextName="textOpenSans14" >
                    Выбрать
                </Button>
            </Container>
            <Container className="contButton">
                <Button className="blueBut dashBut simpleBut" classTextName="textOpenSans14" onClick={()=>{ props.setOff(2, { added: true }) }}>
                    Добавить
                </Button>
            </Container>
        </DashboardCard>

    )
}
export const ChemistryCard = (props) => {
    return (
        <DashboardCard off={props.off} hText="Статус модели" descr="Требуется добавить данные о химических средствах!" notifyColor="#DC3545" >
            <Container className="contButton">
                <Button className="blueBut dashBut simpleBut" classTextName="textOpenSans14" onClick={() => { props.setOff(3, { chem: true }) }} >
                    Добавить
                </Button>
            </Container>
        </DashboardCard>
    )
}
export const IoTCard = (props) => {
    return (
        <DashboardCard off={props.off} hText="Статус датчиков" descr="Нет ни одного датчика!" notifyColor="#E2891F" isBut={<Button className="redBut ButAllMini" imageClassName="icon_for_but" onClick={() => { props.setOff(4, { dat: true }) }} />} >
            <Container style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-end', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
            </Container>
        </DashboardCard>
    )
}
export const EconomicCard = (props) => {
    return (
        <DashboardCard off={props.off} hText="Статус модели" descr="Требуется добавить данные экономических показателей!" notifyColor="#DC3545">
            <Container className="contButton">
                <Button className="blueBut dashBut simpleBut" classTextName="textOpenSans14" onClick={() => { props.setOff(5, { econom: true }) }} >
                    Добавить
                </Button>
            </Container>
        </DashboardCard>
    )
}
export const FieldCard = (props) => {

    return (
        <DashboardCard f="d" off={props.statusOff} hText="Статус модели" descr="Требуется добавить данные о поле!" notifyColor="#DC3545" isBut={<Button className="blueBut ButAllMini"  imageClassName="icon_for_but" />}>
            <Container style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-end', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                <Input className="inpCreateForDashCard" Label="Кадастровый номер" classNameP="textForSign12" onChange={(event) => { props.setOff(1, { kad: event.target.value.trim() }) }} />
            </Container>
            <Container className="contButton">
                <Button className="blueBut dashBut simpleBut" classTextName="textOpenSans14" >
                    Добавить
                </Button>
            </Container>
        </DashboardCard>
    )
}
