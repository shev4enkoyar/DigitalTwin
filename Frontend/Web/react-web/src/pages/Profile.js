import React, { Component } from 'react';
import Navbar from '../components/Header/navbar/NavbarAuthorized';
import { ThemeContextConsumer } from '../components/ThemeContext.js';
import InsideCardForBody from '../components/insideCardForBody/InsideCardForBody';
import CardForBody from '../components/cardForBody/CardForBody';
import './pages.css';
import { Container} from 'react-bootstrap';
import Input from '../components/input/Input';
import GPlus from './../components/logo/G+';
import Yandex from './../components/logo/Yandex';
import VK from './../components/logo/VK';
import ButtonEdit from '../components/button/ButtonEdit';
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
                                    <InsideCardForBody>
                                        <p className="FirstCardH">
                                            Профиль
                                        </p>
                                        <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Фамилия Имя Отчество"/>
                                        <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Электронная почта"/>
                                        <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Номер телефона"/>
                                        <Container style={{ padding: '25px 0px 0px 0px' }}>
                                            <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Введите пароль для сохрранения"/>
                                        </Container>
                                        <Container className="ContForButton">
                                            <ButtonEdit buttonStyle={{
                                                height: 'max - content',
                                                marginBottom:'10px',
                                            padding: '3px 20px',
                                            borderRadius: '5px' }} className="blueBut " textForButton="Сохранить" classTextName="textOpenSans14" />
                                        </Container>
                                    </InsideCardForBody>
                                </Container >
                                <Container className="contTwoLevelForInside">
                                    <InsideCardForBody>
                                        <p className="SecondCardH">
                                            Подключеные сети
                                        </p>
                                        <Container style={{ padding: '2px 5px' } }>
                                            <GPlus style={{width:'50px'} } />
                                            <VK/>
                                            <Yandex />
                                        </Container>
                                    </InsideCardForBody>
                                    <Container className="contThreeLevelForInside">
                                        <InsideCardForBody>
                                            <p className="SecondCardH">
                                                Смена пароля
                                            </p>
                                            <Input classNameP="textForInpCircle" className="inputCircleMini" contClass="margInputContCirce" Label="Текущий пароль"/>
                                            <Input classNameP="textForInpCircle" className="inputCircleMini" contClass="margInputContCirce" Label="Новый пароль"/>
                                            <Input classNameP="textForInpCircle" className="inputCircleMini" contClass="margInputContCirce" Label="Повторите новый пароль"/>
                                            <Container className="ContForButton">
                                                <ButtonEdit buttonStyle={{
                                                    height: 'max - content',
                                                    marginBottom: '10px',
                                                    padding: '3px 20px',
                                                    borderRadius: '5px'
                                                }} className="blueBut " textForButton="Сменить" classTextName="textOpenSans14" />
                                            </Container>
                                        </InsideCardForBody>
                                    </Container >
                                </Container >
                            </Container>
                        </CardForBody>
                    </div>
                </div>
            )}
            </ThemeContextConsumer>
        );
    }
} export default Profile;