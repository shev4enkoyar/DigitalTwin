import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React from "react";
import {ApplicationPaths} from "../../api-authorization/ApiAuthorizationConstants";
import {Link} from "react-router-dom";
import {NavLink} from "reactstrap";

function ProfileDropDown(props) {
    return (
        <DropdownButton id="dropdown-basic-button" title="Профиль">
            <Dropdown.Item href={ApplicationPaths.IdentityManagePath}>Профиль</Dropdown.Item>
            <Dropdown.Item href="/tariffs">Подписки</Dropdown.Item>
            <Dropdown.Item href="/models">Модели</Dropdown.Item>
            <Dropdown.Item >
                <NavLink tag={Link} to={props.logoutPath}>
                    Выйти
                </NavLink>
            </Dropdown.Item>
        </DropdownButton>
    );
}

export default ProfileDropDown;