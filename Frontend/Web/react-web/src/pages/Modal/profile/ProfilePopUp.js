import PopUpWithBlurCanvas from "../../../components/popUp/PopUpWithBlurCanvas";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


const ProfilePopUp = (props) => {
    return (
        <PopUpWithBlurCanvas isActive={props.isActive} handleActiveChange={props.handleActiveChange} >
            <h5>Профиль</h5>
            <ul>
                <li>
                    <Link to={"/profile"}>
                        Профиль
                    </Link>
                </li>
                <li>
                    <Link to={"/models"}>
                        Модели
                    </Link>
                </li>
                <li>
                    <Link to={"/tariffs"}>
                        Подписки
                    </Link>
                </li>
                <li>
                    Выйти
                </li>
            </ul>
        </PopUpWithBlurCanvas>
    );
}
ProfilePopUp.propTypes ={
    isActive : PropTypes.bool.isRequired,
    handleActiveChange: PropTypes.func.isRequired
}
export default ProfilePopUp;