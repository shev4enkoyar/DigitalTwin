import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React, {Component} from "react";
import {ApplicationPaths} from "../../api-authorization/ApiAuthorizationConstants";
import {Link} from "react-router-dom";
import {NavLink} from "reactstrap";
import authService from "../../api-authorization/AuthorizeService";
import {ClientRoutes} from "../../../util/ClientRoutes";

class ProfileDropDown extends Component{

    constructor(props) {
        super(props);
        this.state = { functional: []};
    }

    componentDidMount() {
        this.GetFunctional();
    }

    checkPermission(functional){
        let data = this.state.functional;
        if (data.includes(functional))
            return true;
        return false;
    }

    render() {
        return (
            <DropdownButton id="dropdown-basic-button" title="Профиль">
                <Dropdown.Item href={ApplicationPaths.IdentityManagePath}>Профиль</Dropdown.Item>
                <Dropdown.Item href="/tariffs">Подписки</Dropdown.Item>
                {
                    this.checkPermission(ClientRoutes.MODELS)
                        ?
                            <Dropdown.Item href={ClientRoutes.PREFIX + ClientRoutes.MODELS}>Модели</Dropdown.Item>
                        :
                            null
                }
                {
                    this.checkPermission(ClientRoutes.REGISTER_COMPANY)
                        ?
                            <Dropdown.Item href={ClientRoutes.PREFIX + ClientRoutes.REGISTER_COMPANY}>Зарегистрировать компанию</Dropdown.Item>
                        :
                            null
                }

                <Dropdown.Item >
                    <NavLink tag={Link} to={this.props.logoutPath}>
                        Выйти
                    </NavLink>
                </Dropdown.Item>
            </DropdownButton>
        );
    }

    async GetFunctional() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/functional/get_all', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ functional: data});
    }

}

export default ProfileDropDown;