import Input from '../../../components/input/Input'
import { Col } from 'react-bootstrap';
import { Link } from "react-router-dom"
import './LogInPopUp.css';
import '../../pages.css';
import GPlus from './G+';
import Yandex from './Yandex';
import VK from './VK';
import PopUpWithBlurCanvas from "../../../components/popUp/PopUpWithBlurCanvas";
const LogInPopUp = (props) => {
    return (
        <PopUpWithBlurCanvas isBlur={true} isActive={props.isActive} handleActiveChange={props.handleActiveChange}>
                <h5 id="mainText">Авторизация</h5>
            <Input Label="E-mail" className="input" classNameP="textForSign"/>
            <Input Label="Пароль" className="input" classNameP="textForSign"/>
                <Col className="column_For_LogInPopUp">
                    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <GPlus />
                        <VK />
                        <Yandex />
                    </Col>
                    <Link to={"/models"}>
                        <button type="submit" className="buttonForModal btn btn-primary" onClick={() => {props.handleAuthorizedChanged()} }>
                            Войти
                        </button>
                    </Link>
                </Col>
                <Col className="column_For_LogInPopUp col_ForFooter">
                    <p style={{ marginBottom: '0px', fontFamily: 'Open Sans', fontSize: '12px' }}>Впервые на сайте?</p>
                    <a href="/SignUp" className="linkAutoriz">Зарегистрируйтесь</a>
                </Col>
        </ PopUpWithBlurCanvas>

    );
}; export default LogInPopUp;