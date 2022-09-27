import React, { Component } from 'react';
import Navbar from '../components/Header/navbar/NavbarAuthorized';
import { ThemeContextConsumer } from '../components/ThemeContext.js';
import Inside_Card_For_Body from '../components/Inside_Card_For_Body/Inside_Card_For_Body';
import CardForBody from '../components/cardForBody/CardForBody';
import './pages.css';
import { Row, Col, Container} from 'react-bootstrap';
import Input from '../components/input/Input';
import GPlus from './../components/logo/G+';
import Yandex from './../components/logo/Yandex';
import VK from './../components/logo/VK';
class Profile extends Component {
    render() {
        return (
            <ThemeContextConsumer>{context => (
            <div className={"mainContainer"} >
                    <Navbar />
                    <div className={context.theme + "Gray " + "body_style"}>
                        <CardForBody>
                            <Container className="contForInsideCard" >
                                <Container className="contTwoLevelForInside">
                                    <Inside_Card_For_Body>
                                        <p className="FirstCardH">Профиль</p>
                                        <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Фамилия Имя Отчество"/>
                                        <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Электронная почта"/>
                                        <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Номер телефона"/>
                                        <Container style={{ padding: '25px 0px 0px 0px' }}>
                                            <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Введите пароль для сохрранения"/>
                                        </Container>
                                        <Container className="ContForButton">
                                        <button type="submit" className="buttonFirstCardInside  btn btn-primary" >Сохранить</button>
                                        </Container>
                                    </Inside_Card_For_Body>
                                </Container >
                                <Container className="contTwoLevelForInside">
                                    <Inside_Card_For_Body>
                                        <p className="SecondCardH">Подключеные сети</p>
                                        <Container style={{ padding: '2px 5px' } }>
                                        <GPlus style={{width:'50px'} } />
                                        <VK/>
                                            <Yandex />
                                        </Container>
                                    </Inside_Card_For_Body>
                                    <Container className="contThreeLevelForInside">
                                    <Inside_Card_For_Body>
                                            <p className="SecondCardH">Смена пароля</p>
                                            <Input classNameP="textForInpCircle" className="inputCircleMini" contClass="margInputContCirce" Label="Текущий пароль"/>
                                            <Input classNameP="textForInpCircle" className="inputCircleMini" contClass="margInputContCirce" Label="Новый пароль"/>
                                            <Input classNameP="textForInpCircle" className="inputCircleMini" contClass="margInputContCirce" Label="Повторите новый пароль"/>
                                            <Container className="ContForButton">
                                                <button type="submit" className="buttonFirstCardInside  btn btn-primary" >Сменить</button>
                                            </Container>
                                        </Inside_Card_For_Body>
                                    </Container >
                                    </Container >
                                </Container>
                        </CardForBody>
                        </div>
                </div>)}
            </ThemeContextConsumer>
        );
    }
} export default Profile;