import React, { Component } from 'react';
import CardForBody from '../components/cardForBody/CardForBody.js';
import './pages.css';
import Input from './../components/input/Input.js';
import Header from '../components/Header/SubHeader/Header';
import { ThemeContextConsumer } from "../components/ThemeContext"
import Tumbler from '../components/tumbler/Tumbler.js';
import { Link } from "react-router-dom";
import ButtonEdit from '../components/button/ButtonEdit.js';
class SignUp extends Component {
    render() {
        
        return (<>
            <ThemeContextConsumer>{context=>( 
            <div className={"mainContainer"}>
                <Header />
                    <div className={context.theme + "Gray " + "body_style"}>
                        <CardForBody classForContB="signUpWidth">
                        <h5 style={{ fontFamily: 'Open Sans',margin:'0px 0px 40px 0px' }}>Регистрация</h5>
                        <Tumbler/>
                        <form>
                                    <Input className="input" classNameP="textForSign" Label="ФИО"></Input>
                                    <Input className="input" classNameP="textForSign" Label="Почта"></Input>
                                    <Input className="input" classNameP="textForSign" Label="Пароль"></Input>
                                    <Input className="input" classNameP="textForSign" Label="Повторите пароль"></Input>
                                <Link to={'/signUpEnd'}>
                                    <ButtonEdit buttonStyle={{ margin:'10px 0px' }} className="blueBut dashBut simpleBut" textForButton="Создать аккаунт" classTextName="textOpenSans14" />
                                </Link>
                        </form>
                        <div id="Warning">Нажимая кнопку “Создать аккаунт”, я соглашаюсь с <a style={{ color: '#F5CA5D' }} href="#nogo">политикой конфиденциальности</a>.</div>
                    </CardForBody>
                </div>
                </div>)}
            </ThemeContextConsumer>
        </>
        );
    }
} export default SignUp;