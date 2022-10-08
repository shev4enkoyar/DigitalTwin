import React, { Component } from 'react';
import Navbar from '../components/Header/navbar/NavbarAuthorized';
import { ThemeContextConsumer } from '../components/ThemeContext.js';
import CardForBody from '../components/cardForBody/CardForBody';
import './pages.css';
import { Container, Col} from 'react-bootstrap';
import Input from '../components/input/Input';
import GPlus from './../components/logo/G+';
import ContForProfile from './../components/contForAnkProfile/ContForProfile';
import Yandex from './../components/logo/Yandex';
import VK from './../components/logo/VK';
import ButtonEdit from '../components/button/ButtonEdit';
class Profile extends Component {
    render() {
        return (
            <ThemeContextConsumer>{context => (
                <Container className={"mainContainer"} >
                    <Navbar />
                    <Container className={context.theme + "Gray " + "body_style"}>
                        <CardForBody styleTextForCard={{ display: 'flex', flexWrap: 'wrap'}}>
                            <Col>
                                <ContForProfile classNameForContMain="contTwoLevelForInside" classNameForP="FirstCardH" nameCard="Профиль">
                                    <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Фамилия Имя Отчество" />
                                    <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Электронная почта" />
                                    <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Номер телефона" />
                                    <Container style={{ padding: '35px 0px 0px 0px' }}>
                                        <Input classNameP="textForInpCircle" className="inputCircle" contClass="margInputContCirce" Label="Введите пароль для сохрранения" />
                                    </Container>
                                    <Container className="ContForBut">
                                        <ButtonEdit buttonStyle={{
                                        height: 'max - content',
                                        marginBottom: '10px',
                                        padding: '3px 20px',
                                        borderRadius: '5px'
                                        }} className="blueBut " textForButton="Сохранить" classTextName="textOpenSans14" />
                                    </Container>
                                </ContForProfile>
                            </Col>
                            <Col>
                                <ContForProfile classNameForContMain="contTwoLevelForInside" classNameForP="SecondCardH" nameCard="Подключеные сети">
                                    <GPlus style={{ width: '50px' }} />
                                    <VK />
                                    <Yandex />
                                </ContForProfile>
                                <ContForProfile classNameForContMain="contTwoLevelForInside" classNameForP="SecondCardH" nameCard="Смена пароля">
                                    <Input classNameP="textForInpCircle" className="inputCircleMini" contClass="margInputContCirce" Label="Текущий пароль" />
                                    <Input classNameP="textForInpCircle" className="inputCircleMini" contClass="margInputContCirce" Label="Новый пароль" />
                                    <Input classNameP="textForInpCircle" className="inputCircleMini" contClass="margInputContCirce" Label="Повторите новый пароль" />
                                    <Container className="ContForBut">
                                        <ButtonEdit buttonStyle={{
                                        height: 'max - content',
                                        marginBottom: '10px',
                                        padding: '3px 20px',
                                        borderRadius: '5px'
                                    }} className="blueBut " textForButton="Сменить" classTextName="textOpenSans14" />
                                    </Container>
                                </ContForProfile>
                            </Col>
                        </CardForBody>
                    </Container>
                </Container>
            )}
            </ThemeContextConsumer>
        );
    }
} export default Profile;