import React, { Component } from 'react';
import { ThemeContextConsumer } from '../../components/ThemeContext.js';
import CardForTariffs from './components/insideCardForBody/InsideCardForTariffs';
import CardForBody from '../../components/cardForBody/CardForBody';
import '../pages.css';
import {Button, Col, Container, Row} from 'react-bootstrap';
import TableForTariffs from './components/tableForTariffs/TableForTariffs';
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
                <div >
                    <Container className={context.theme + "Gray " + "body_style"}>
                        <Row>
                            <Col className="MargForCol">
                                <CardForBody styleForCard={{ position: 'relative'} } className="signUpWidth" classForContB=" centerCard" >
                                    <p className="textOpenSansForHistTar">
                                        Продлить/отменить подписки
                                    </p>
                                    {
                                        this.AddCancel.map((addcanc) =>
                                            <CardForTariffs AddCancel={addcanc} />)
                                    }
                                    <Button className="blueBut createBut" buttonStyle={{ maxWidth: '70%', width: '70%' }}  imageClassName="plus2" textForButton="Добавить подписку" classTextName="textOpenSans14"/>
                                    <a href="src/pages/tariffs/Tariffs#nogo" className="linkAutoriz">
                                        описание подписок
                                    </a>
                                </CardForBody>
                            </Col>
                            <Col className="MargForCol">
                                <CardForBody styleForCard={{ position: 'relative' }} className="signUpWidth">
                                    <Container className="ContForHistoryTariff">
                                        <TableForTariffs textForTable="История подписок" classNamesTD="ForBox" headersForTable={this.headerForTariffs} contentsForTable={this.historyTariffs} />
                                    </Container>
                                </CardForBody>
                            </Col>
                        </Row>
                    </ Container>
                </div>
            )}
            </ThemeContextConsumer>
        );
    }
} export default Tariffs;