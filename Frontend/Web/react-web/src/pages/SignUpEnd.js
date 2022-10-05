import React, { Component } from 'react';
import CardForBody from '../components/cardForBody/CardForBody.js';
import './pages.css';
import { Container } from 'react-bootstrap';
import ForSignUp from '../components/forSignUp/ForSignUp'
import { ThemeContextConsumer } from "../components/ThemeContext"
import { Navigate } from 'react-router-dom';
import NavbarHome from "../components/Header/homeNavbar/NavbarHome";
class SignUpEnd extends Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 10000)
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    render() {
        return (
            this.state.redirect
            ? <Navigate to="/" />
            :
            <ThemeContextConsumer>{context => (
                <div className={"mainContainer"}>
                    <NavbarHome />
                    <div className={context.theme + "Gray " + "body_style"}>
                        <CardForBody >
                            <Container style={{ width: '320px' }}>
                                <ForSignUp />
                                <h5 className="StyleForSignUpEndH">Регистрация в Digital Twin</h5>
                                <p className="StyleForSignUpEndp1">Для завершения регистрации перейдите по ссылке в письме.
                                    Письмо придет на указанный почтовый адрес в течение пары минут.</p>
                                <p className="StyleForSignUpEndp2">Через 10 секунд вы будете автоматически перенаправлены на страницу авторизации</p>
                            </Container>
                        </CardForBody>
                    </div>
                </div>)}
            </ThemeContextConsumer>
            );
    }
} export default SignUpEnd;