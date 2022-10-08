import PopUpWithBlurCanvas from "../../../components/popUp/PopUpWithBlurCanvas";
import PropTypes from "prop-types";
import { Col, Container } from 'react-bootstrap';
import '../login/LogInPopUp.css';
import './../../pages.css';
import { ThemeContextConsumer } from "../../../components/ThemeContext";
const ProfilePopUp = (props) => {
    return (
        <ThemeContextConsumer>{
            context => (
                <PopUpWithBlurCanvas className="profPop" isActive={props.isActive} handleActiveChange={props.handleActiveChange} >
                    <p id="mainText" className='profileLink'>
                        Профиль
                    </p>
                    <Container className=' profileLink'>
                        <a href="/profile" className={context.theme}>
                            Профиль
                        </a>
                        <hr />
                    </Container>
                    <Container className=' profileLink'>
                        <a textDecoration="none" href="/tariffs" className={context.theme}>
                            Подписки
                        </a>
                        <hr />
                    </Container>
                    <Container className=' profileLink' >
                        <a href="/models" className={context.theme}>
                            Модели
                        </a>
                        <hr />
                    </Container>
                    <Container className=' profileLink'>
                        <a color='red' id="out" href="/">
                            Выйти
                        </a>
                        <hr />
                    </Container>
                </PopUpWithBlurCanvas>
            )
        }</ThemeContextConsumer>
    );
}
ProfilePopUp.propTypes ={
    isActive : PropTypes.bool.isRequired,
    handleActiveChange: PropTypes.func.isRequired
}
export default ProfilePopUp;