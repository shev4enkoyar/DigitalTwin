import React, {useEffect, useState} from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, NavLink,
} from 'reactstrap';
import authService from "../../../api-authorization/AuthorizeService";
import {ApplicationPaths} from "../../../api-authorization/ApiAuthorizationConstants";
import {Link} from "react-router-dom";
import {ClientRoutes} from "../../../../util/ClientRoutes";
import {ThemeContextConsumer} from "../../../ThemeContext";

function ProfileDropDown({ direction, ...args }) {
    const GetFunctional = async () => {
        const token = await authService.getAccessToken();
        const response = await fetch('api/functional/get_all', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data;
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [functional, setFunctional] = useState(null);
    useEffect( () => {
        let array;
        async function fetchData() {
            array = await GetFunctional();
            setFunctional(array);
        }
        fetchData();
    }, [])
    const checkPermission = (func) => {
        let data = functional;
        if (data !== null)
            if (data.includes(func))
                return true;
        return false;
    }
    const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <ThemeContextConsumer>
            {context => (
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                <DropdownToggle color="transparent" caret>
                    <img className={context.theme + "Icon" + " icon"} src="https://www.svgrepo.com/show/333287/profile.svg"/>
                </DropdownToggle>
                <DropdownMenu dark {...args}>
                    <DropdownItem>
                        <NavLink style={{color: "black"}} tag={Link} to={ApplicationPaths.IdentityManagePath}>
                            Профиль
                        </NavLink>
                    </DropdownItem>
                    {
                        checkPermission(ClientRoutes.SUBSCRIPTIONS)
                            ?
                            <DropdownItem >
                                <NavLink style={{color: "black"}}  tag={Link} to={ClientRoutes.PREFIX + ClientRoutes.SUBSCRIPTIONS}>
                                    Подписки
                                </NavLink>
                            </DropdownItem>
                            :
                            null
                    }
                    {
                        checkPermission(ClientRoutes.MODELS)
                            ?
                            <DropdownItem>
                                <NavLink style={{color: "black"}}  tag={Link} to={ClientRoutes.PREFIX + ClientRoutes.MODELS}>
                                    Модели
                                </NavLink>
                            </DropdownItem>
                            :
                            null
                    }
                    {
                        checkPermission(ClientRoutes.REGISTER_COMPANY)
                            ?
                            <DropdownItem >
                                <NavLink style={{color: "black"}}  tag={Link} to={ClientRoutes.PREFIX + ClientRoutes.REGISTER_COMPANY}>
                                    Зарегистрировать компанию
                                </NavLink>
                            </DropdownItem>
                            :
                            null
                    }
                    {
                        checkPermission(ClientRoutes.COMPANY_INVITE)
                            ?
                            <DropdownItem >
                                <NavLink style={{color: "black"}}  tag={Link} to={ClientRoutes.PREFIX + ClientRoutes.COMPANY_INVITE}>
                                    Пригласить в компанию
                                </NavLink>
                            </DropdownItem>
                            :
                            null
                    }
                    <DropdownItem >
                        <NavLink style={{color: "black"}}  tag={Link} to={logoutPath}>
                            Выйти
                        </NavLink>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            )}
        </ThemeContextConsumer>
    );


}

export default ProfileDropDown;