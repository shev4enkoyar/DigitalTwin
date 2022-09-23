import React, { Component } from 'react';
import Header_Before_Profile from '../components/Header/Header_Before_Profile/Header_Before_Profile';
import { ThemeContextConsumer } from '../components/ThemeContext.js';
import Inside_Card_For_Body from '../components/Inside_Card_For_Body/Inside_Card_For_Body';
import CardForBody from '../components/Card_For_body/CardForBody';
import './pages.css';
import { Row, Col, Container} from 'react-bootstrap';
import InputCircle from '../components/input/InputCircle';
import InputCircleMini from '../components/input/InputCircleMini';
import GPlus from './../components/logo/G+';
import Yandex from './../components/logo/Yandex';
import VK from './../components/logo/VK';
class Profile extends Component {
    render() {
        return (
            <ThemeContextConsumer>{context => (
            <div style={{ height: '100%' }}>
                    <Header_Before_Profile />
                    <div className={context.theme + "Gray " + "body_style"}>
                        <CardForBody>
                            <Container className="contForInsideCard" >
                                <Container className="contTwoLevelForInside">
                                    <Inside_Card_For_Body>
                                        <p className="FirstCardH">Профиль</p>
                                        <InputCircle Label="Фамилия Имя Отчество">
                                        </InputCircle >
                                        <InputCircle Label="Электронная почта">
                                        </InputCircle>
                                        <InputCircle Label="Номер телефона">
                                        </InputCircle>
                                        <Container style={{ padding: '25px 0px 0px 0px' } }>
                                        <InputCircle Label="Введите пароль для сохрранения">
                                            </InputCircle></Container>
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
                                            <InputCircleMini Label="Текущий пароль">
                                            </InputCircleMini >
                                            <InputCircleMini Label="Новый пароль">
                                            </InputCircleMini>
                                            <InputCircleMini Label="Повторите новый пароль">
                                            </InputCircleMini>
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