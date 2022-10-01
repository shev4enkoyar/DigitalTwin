import React, { Component } from 'react';
import Navbar from '../components/Header/navbar/NavbarAuthorized';
import { ThemeContextConsumer } from '../components/ThemeContext.js';
import CardForTariffs from '../components/Inside_Card_For_Body/Inside_Card_For_Tariffs';
import CardForBody from '../components/cardForBody/CardForBody';
import './pages.css';
import { Row, Col, Container } from 'react-bootstrap';
import plus_icon from './../components/Data/plusForButtonAdding.svg';
import Table_For_Tariffs from '../components/Table_For_Tariffs/Table_For_Tariffs';
import AddingButton from '../components/Button/AddingButton';
import ButtonEdit from '../components/Button/ButtonEdit';
class Tariffs extends Component {
     AddCancel = ['Наименование подписки 1',
        'Наименование подписки 2',
        'Наименование подписки 3',
        'Наименование подписки 4'
    ]
    headerForTariffs = [ '#', 'Дата', 'Наименования', 'Сумма'];
    historyTariffs = [{
        num: "1",
        date: new Date(2020, 4, 7).toLocaleDateString(),
        name: "Подписка 1",
        sum:"5000p"
    },
        {
            num: "2",
            date: new Date(2020, 7, 21).toLocaleDateString(),
            name: "Подписка 2",
            sum: "10000р"
        },
        {
            num: "3",
            date: new Date(2020, 11, 12).toLocaleDateString(),
            name: "Подписка 3",
            sum: "22000р"
        },
        {
            num: "4",
            date: new Date(2021, 1, 30).toLocaleDateString(),
            name: "Подписка 4",
            sum: "35000р"
        },
        {
            num: "5",
            date: new Date(2021, 4, 25).toLocaleDateString(),
            name: "Подписка 1",
            sum: "5000р"
        },
        {
            num: "6",
            date: new Date(2021, 9, 28).toLocaleDateString(),
            name: "Подписка 2",
            sum: "10000р"
        },
        {
            num: "7",
            date: new Date(2022, 0, 22).toLocaleDateString(),
            name: "Подписка 3",
            sum: "22000р"
        },
        {
            num: "8",
            date: new Date(2022, 4, 13).toLocaleDateString(),
            name: "Подписка 4",
            sum: "35000р"
        }
    ]
    
    render() {
        return (
            <ThemeContextConsumer>{context => (
                <div className={"mainContainer"}>
                    <Navbar />
                    <div className={context.theme + "Gray " + "body_style"}>
                        <Col className="MargForCol">
                            <CardForBody classForContB="centerCard" >
                                <p className="textOpenSansForHistTar">Продлить/отменить подписки</p>
                                
                                {this.AddCancel.map((addcanc) =>
                                    <CardForTariffs AddCancel={addcanc} />)}
                                <ButtonEdit className="blueBut createBut" buttonStyle={{ maxWidth: '70%', width: '70%' }} image={plus_icon} imageClassName="plus2" textForButton="Добавить подписку" classTextName="textOpenSans14"/>
                            <a href="#nogo" className="linkAutoriz">описание подписок</a>
                            </CardForBody></Col>
                        <Col className="MargForCol">
                            <CardForBody>
                                <Container className="ContForHistoryTariff">
                                    <Table_For_Tariffs textForTable="История подписок" classNamesTD="ForBox" headersForTable={this.headerForTariffs} contentsForTable={this.historyTariffs} />
                                </Container>
                            </CardForBody></Col>
                    </div>
                </div>)}
            </ThemeContextConsumer>
        );
    }
} export default Tariffs;