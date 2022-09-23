import React, { Component } from 'react';
import CardForBody from './../components/Card_For_body/CardForBody.js';
import './pages.css';
import Input from './../components/input/Input.js';
import { Container } from 'react-bootstrap';
import Header from '../components/Header/SubHeader/Header';
import { ThemeContextConsumer } from "../components/ThemeContext";
import ButtonOpt from "../components/Button/ButtonOpt";
import Combobox from '../components/Combobox/ComboBox.js';
class CreateModel extends Component {
    render() {

        return (<>
                <ThemeContextConsumer>{context => (
                    <div style={{ height: '100%' }}>
                        <Header />
                        <div className={context.theme + "Gray " + "body_style"}>
                            <CardForBody>
                                <h5 style={{ fontFamily: 'Open Sans', margin: '20px 0px 50px 0px' }}>Создание модели</h5>
                            <Input Label="Наименование модели" placeholder="Введите наименование..."></Input>
                            
                            <Container style={{
                                display: 'flex', padding: '25px 0px 5px 0px',justifyContent: 'center' } }><ButtonOpt textForButton="Создать модель" /></Container>
                            <div id="Warning"><a style={{ color: '#F5CA5D', textDecoration: 'auto' }} href="/models">Вернуться к моделям</a></div>
                            
                        </CardForBody>
                        </div>
                    </div>)}
                </ThemeContextConsumer>
            )
        </>
        );
    }
} export default CreateModel;
