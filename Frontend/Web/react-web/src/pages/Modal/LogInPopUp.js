import CardForBody from '../../components/Card_For_body/CardForBody'
import Input from '../../components/input/Input'
import { Col, Container } from 'react-bootstrap';
import { Link } from "react-router-dom"
import './LogInPopUp.css';
import '../pages.css';
import { ThemeContextConsumer } from '../../components/ThemeContext';
import GPlus from './G+';
import Yandex from './Yandex';
import VK from './VK';
const LogInPopUp = (props) => {
    return (
        <div className={props.isActive ? "containerForPop active" : "containerForPop"} onClick={() => { props.handleActiveChange() }}>
            <div style={{position: "fixed", height: "100vh", width: "100vw", background: "rgb(0,0,0,0.6)", right: 0, top: 0}}/>
            <CardForBody onClick={e => e.stopPropagation()}>
                <h5 id="mainText">Авторизация</h5>
                <Input Label="E-mail"></Input>
                <Input Label="Пароль"></Input>
                <Col className="column_For_LogInPopUp">
                    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <GPlus />
                        <VK />
                        <Yandex />
                    </Col>
                    <Link to={"/models"}>
                        <button type="submit" className="buttonForModal btn btn-primary">
                            Войти
                        </button>
                    </Link>
                </Col>
                <Col className="column_For_LogInPopUp col_ForFooter">
                    <p style={{ marginBottom: '0px', fontFamily: 'Open Sans', fontSize: '12px' }}>Впервые на сайте?</p>
                    <a href="/SignUp" className="linkAutoriz">Зарегистрируйтесь</a>
                </Col>
            </CardForBody>
        </div>

    );
}; export default LogInPopUp;