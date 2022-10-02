import React, { Component} from 'react';
import CardForBody from '../components/cardForBody/CardForBody.js';
import './pages.css';
import Input from './../components/input/Input.js';
import { Container } from 'react-bootstrap';
import Header from '../components/Header/SubHeader/Header';
import { ThemeContextConsumer } from "../components/ThemeContext";
import ButtonOpt from "../components/Button/ButtonOpt";
import { Link } from 'react-router-dom';
import Combobox from '../components/Combobox/ComboBox.js';
import ButtonEdit from '../components/Button/ButtonEdit.js';
class CreateModel extends Component {
    state = { isInherit: true }
    setInherit = (value) => {
        this.state.isInherit = value
        console.log(this.state.isInherit)
    }
    isPred = ["Да", "Нет",]
    render() {

        return (
                <>
                    <ThemeContextConsumer>
                        {
                            context =>
                            (
                            <div className="mainContainer">
                                <Header />
                                <div className={context.theme + "Gray " + "body_style"}>
                                    <CardForBody>
                                        <h5 style={{ fontFamily: 'Open Sans', margin: '20px 0px 50px 0px' }}>
                                            Создание модели
                                        </h5>
                                        <Input className="input" classNameP="textForSign" Label="Наименование модели" placeholder="Введите наименование..."/>
                                            <Combobox classTextCombobox="textForSign" textCombobox="Был ли ранее предшественник?" setInherit={this.setInherit} options={this.isPred}/>
                                            <Container style={{ display: 'flex', padding: '25px 0px 5px 0px', justifyContent: 'center' }}>
                                                <Link style={{ width: '60%', display: 'flex', justifyContent: 'center' }} to="/dashboardEmpty" state={this.state}>
                                                    <ButtonEdit className="blueBut simpleBut " textForButton="Создать модель" classTextName="textOpenSans14"/>
                                                </Link>
                                            </Container>
                                        <div id="Warning">
                                            <a style={{ color: '#F5CA5D', textDecoration: 'auto' }} href="/models">
                                                Вернуться к моделям
                                            </a>
                                        </div>
                                    </CardForBody>
                                </div>
                            </div>
                            )
                        }
                    </ThemeContextConsumer>
                </>
                );
            }
} export default CreateModel;