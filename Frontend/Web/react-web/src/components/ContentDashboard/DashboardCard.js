import { Component } from "react";
import Input from './../input/Input';
import Combobox from './../Combobox/ComboBox';
import './ContentDashboard.css';
import sen_icon from './../Data/SensorIoT_Icon.svg';
import map_icon from './../Data/Map_Icon.svg';
import ButtonEdit from './../Button/ButtonEdit';
import { Container, Col, Row } from 'react-bootstrap';
import CardForBody from './../cardForBody/CardForBody';
export function DashboardCard(props) {
    return (
        <Container className="cardSize" >
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
        </Container>
    );
};
export const HistoryCard = (props) => {
    let isAllOk = false;
    return (
        <DashboardCard hText="Статус модели" descr="Требуется добавить исторические данные!" notifyColor="#DC3545" >
                <Container className="contButton">
                    <ButtonEdit className="blueBut dashBut simpleBut" textForButton="Импортировать" classTextName="textOpenSans14" />
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
                    <ButtonEdit onClick={() => props.isPred()} className="blueBut dashBut simpleBut" textForButton="Начальное состояние" classTextName="textOpenSans14" />
                </Container>
        </DashboardCard>
    )
}
export const CultureCard = (props) => {
    let isAllOk = false;
    const cult = ["Введите наименование культуры...", "Рис", "Овес"]
    const sortForCult = ["Введите сорт культуры..."]
    return (
        <DashboardCard hText="Статус модели" descr="Требуется добавить данные о культуре!" notifyColor="#DC3545" >
            <Container style={{display: 'flex', flexWrap: 'wrap'} }>
                <Col style={{ marginRight: '1px' } }>
                    <Combobox classTextCombobox="textForSign12" textCombobox="Культура" classNameCont="padCombobox " options={cult} />
                    <Input Label="Фракция" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" />
                    <Input Label="Норма высева" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" />
                </Col>
                <Col style={{ marginLeft: '1px' }}>
                    <Combobox classTextCombobox="textForSign12" textCombobox="Сорт" classNameCont="padCombobox " options={sortForCult} />
                    <Input Label="Густота" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" />
                    <Input Label="Вес этапов" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" />
                </Col>
            </Container>
            <Container className="contButton">
                <ButtonEdit className="blueBut dashBut simpleBut" textForButton="Добавить" classTextName="textOpenSans14" />
            </Container>
        </DashboardCard>
    )
}
export const MachineCard = (props) => {
    const techs = ["Введите технику..."];
    return (
        <DashboardCard hText="Статус модели" descr="Требуется добавить технику!" notifyColor="#DC3545" >
                <Container style={{ display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                    <ButtonEdit className="blueBut dashBut simpleBut" textForButton="Выбрать" classTextName="textOpenSans14" />
                </Container>
                <Container className="contButton">
                    <ButtonEdit className="blueBut dashBut simpleBut" textForButton="Добавить" classTextName="textOpenSans14" />
                </Container>
        </DashboardCard>
    )
}
export const ChemistryCard = (props) => {
    return (
        <DashboardCard hText="Статус модели" descr="Требуется добавить данные о химических средствах!" notifyColor="#DC3545" >
            <Container className="contButton">
                <ButtonEdit className="blueBut dashBut simpleBut" textForButton="Добавить" classTextName="textOpenSans14" />
            </Container>
        </DashboardCard>
    )
}
export const IoTCard = (props) => {
    return (
        <DashboardCard hText="Статус датчиков" descr="Нет ни одного датчика!" notifyColor="#E2891F" isBut={<ButtonEdit className="redBut ButAllMini" image={sen_icon} imageClassName="icon_for_but" />}>
            <Container style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-end', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
            </Container>
        </DashboardCard>
    )
}
export const EconomicCard = (props) => {
    return (
        <DashboardCard hText="Статус модели" descr="Требуется добавить данные экономических показателей!" notifyColor="#DC3545" >
                <Container className="contButton">
                    <ButtonEdit className="blueBut dashBut simpleBut" textForButton="Добавить" classTextName="textOpenSans14" />
                </Container>
        </DashboardCard>
    )
}
export const FieldCard = (props) => {
    return (
        <DashboardCard hText="Статус модели" descr="Требуется добавить данные о поле!" notifyColor="#DC3545" isBut={<ButtonEdit className="blueBut ButAllMini" image={map_icon} imageClassName="icon_for_but"/> }>
                <Container style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-end', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                <Input className="inpCreateForDashCard" Label="Кадастровый номер" classNameP="textForSign12"/>
                </Container>
                <Container className="contButton">
                    <ButtonEdit className="blueBut dashBut simpleBut" textForButton="Добавить" classTextName="textOpenSans14" />
                </Container>
        </DashboardCard>
    )
}
