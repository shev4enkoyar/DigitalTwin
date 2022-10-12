import React, { Component} from 'react';
import CardForBody from '../components/cardForBody/CardForBody.js';
import './pages.css';
import Input from './../components/input/Input.js';
import {Button, Container} from 'react-bootstrap';
import { ThemeContextConsumer } from "../components/ThemeContext";
import { Link } from 'react-router-dom';
import Combobox from '../components/combobox/ComboBox.js';
class CreateModel extends Component {
    state = { isInherit: true }
    setInherit = (value) => {
        this.state.isInherit = value
        console.log(this.state.isInherit)
    }
    isPred = ["Да", "Нет",]
    render() {

        return (
            <ThemeContextConsumer>
                {context =>
                    (
                        <>
                            <div className={context.theme + "Gray " + "body_style"}>
                                <CardForBody className="signUpWidth">
                                    <h5 style={{ fontFamily: 'Open Sans', margin: '20px 0px 50px 0px' }}>
                                        Создание модели
                                    </h5>
                                    <Input className="input" classNameP="textForSign" Label="Наименование модели" placeholder="Введите наименование..."/>

                                    <Combobox className="FormControlSelect minWForCombobox" classTextCombobox="textForSign" textCombobox="Был ли ранее предшественник?" setInherit={this.setInherit} options={this.isPred}/>
                                    <Container style={{ display: 'flex', padding: '25px 0px 5px 0px', justifyContent: 'center' }}>
                                        <Link style={{ width: '60%', display: 'flex', justifyContent: 'center' }} to="/dashboardEmpty" state={this.state}>
                                            <Button className="blueBut simpleBut " classTextName="textOpenSans14">
                                                Создать модель
                                            </Button>
                                        </Link>
                                    </Container>
                                    <div id="Warning">
                                        <a style={{ color: '#F5CA5D', textDecoration: 'auto' }} href="/models">
                                            Вернуться к моделям
                                        </a>
                                    </div>
                                </CardForBody>
                            </div>
                        </>
                    )
                }
            </ThemeContextConsumer>
                );
        }
} export default CreateModel;