import { Component } from "react";
import Input from './input/Input';
import Combobox from './Combobox/ComboBox';
import './ContentDashboard/ContentDashboard.css';
import ButtonOpt from './Button/ButtonOpt';
import { Container, Col } from 'react-bootstrap';
import CardForBody from './cardForBody/CardForBody';
export class Tariff {
    constructor(name, cost, possibility) {
      this.name = name;
      this.cost = cost;
      this.possibility = possibility;
    }
}

export class IconButton {
    constructor(path, name, icon) {
        this.path = path;
        this.name = name;
        this.icon = icon;
    }

}

export class Culture {
    constructor(name, viewModel, currentEvent, advice, color) {
        this.name = name;
        this.viewModel = viewModel;
        this.currentEvent = currentEvent;
        this.advice = advice;
        this.color = color;
    }
}

export class MyTariff {
    constructor(num, name, date, sum) {
        this.num = num;
        this.name = name;
        this.date = date;
        this.sum = sum;
    }

}
export function DashboardCard(props){
    
    return (
        <Container className="cardSize" >
            <CardForBody>
                <Container className="ContForCardDash">
                        <p className="textForStatus" >
                            {props.hText}
                        </p>
                        <Col className="ColForBut">
                        <p className="NeedingText">
                            {props.descr}
                                <Col style={{ margin: '6px 0px 6px 45px', display: 'flex', justifyContent: 'flex-end' }}>
                                    {props.isBut}
                                </Col>
                            </p>
                        </Col>
                {props.isHistory ?
                    <div>
                        <Container className="contButton">
                            <ButtonOpt textForButton="Импортировать"/>
                        </Container>
                        <div className="Warning">Файл импорта должен соответсвовать
                                <a style={{ color: '#F5CA5D', textDecorationLine: 'none' }} href="#nogo">
                                     шаблону
                                </a>
                        </div>
                            <p className="textForStatus marForDescr" >
                                Если модель не имеет исторических данных, нажмите “Начальное состояние”
                            </p>
                        <Container className="contButton">
                            <ButtonOpt textForButton="Начальное состояние"/>
                        </Container>
                 </div>
                  :
                    (props.isTeh ?
                            <div>
                                <Container style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-end', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                                    <Combobox classTextCombobox="textForSign12" textCombobox="Наименование техники" classNameCont="padCombobox "/>
                                    <Input Label="Количество" classNameP="textForSign12" className="ForDashboard" contClass="contForCardDashb" />
                                </Container>
                                <Container className="contButton">
                                    <ButtonOpt textForButton="Добавить" />
                                </Container>
                            </div>
                        :
                            (props.isEarth ?
                                <div>
                                    <Container style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-end', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                                        <Combobox classTextCombobox="textForSign12" textCombobox="Тип почвы" classNameCont="padCombobox "/>
                                        <Container style={{ width: '30%' }} />
                                </Container>
                                <Container className="contButton">
                                            <ButtonOpt textForButton="Добавить"/>
                                </Container>
                                </div>
                            :
                            <div>
                            </div>
                        )
                    )
                }
                </Container>
            </CardForBody>
        </Container>
        );
};

const cultures = () => {
    return(
    [
        Culture("Пшеница", "Вид модели", "Текущее мероприятие", "Совет", "#00A500"),
        Culture("Кукуруза", "Вид модели", "Текущее мероприятие", "Совет", "#FFCC00"),
        Culture("Название модели", "Вид модели", "Текущее мероприятие", "Совет", "#FE0000"),
    ])
}

