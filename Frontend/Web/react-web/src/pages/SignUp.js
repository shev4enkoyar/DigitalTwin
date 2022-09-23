import React, { Component } from 'react';
import CardForBody from './../components/Card_For_body/CardForBody.js';
import './pages.css';
import Input from './../components/input/Input.js';
import { Container } from 'react-bootstrap';
import Header from '../components/Header/SubHeader/Header';
import { ThemeContextConsumer } from "../components/ThemeContext"
import Tumbler from '../components/Tumbler/Tumbler.js';
import {Link} from "react-router-dom"
import { ModalContextConsumer } from './Modal/ModalContext.js';
class SignUp extends Component {
    render() {
        
        return (<>
            <ModalContextConsumer>{modalContext  => (
            <ThemeContextConsumer>{context=>( 
            <div style={{ height:'100%' }}>
                <Header />
                    <div className={context.theme + "Gray " + "body_style"}>
                    <CardForBody>
                        <h5 style={{ fontFamily: 'Open Sans',margin:'0px 0px 40px 0px' }}>Регистрация</h5>
                        <Tumbler/>
                        <form>
                        <Input Label="ФИО"></Input>
                        <Input Label="Почта"></Input>
                        <Input Label="Пароль"></Input>
                                <Input Label="Повторите пароль"></Input>
                                <Link to={'/signUpEnd'}>
                                        <button type="submit" id="forSignUp" className=" btn btn-primary my-3" toggleModal={modalContext.toggleModal}>Создать аккаунт</button>
                                </Link>
                        </form>
                        <div id="Warning">Нажимая кнопку “Создать аккаунт”, я соглашаюсь с <a style={{ color: '#F5CA5D' }} href="#nogo">политикой конфиденциальности</a>.</div>
                    </CardForBody>
                </div>
                </div>)}
            </ThemeContextConsumer>
                )
            }
            </ModalContextConsumer>
        </>
        );
    }
} export default SignUp;