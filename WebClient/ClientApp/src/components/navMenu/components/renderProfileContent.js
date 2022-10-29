import {Dropdown, Popover} from "rsuite";
import React, {useEffect, useState} from "react";
import authService from "../../api-authorization/AuthorizeService";
import {NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import {ApplicationPaths} from "../../api-authorization/ApiAuthorizationConstants";
import {ClientRoutes} from "../../../util/ClientRoutes";

const RenderProfileContent = ({ onClose, left, top, className, ...rest }, ref) => {
    const [functional, setFunctional] = useState(null);
    const GetFunctional = async () => {
        const token = await authService.getAccessToken();
        const response = await fetch('api/functional/get_all', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data;
    }
    const handleSelect = eventKey => {
        onClose();
        console.log(eventKey);
    };
    const checkPermission = (func) => {
        let data = functional;
        if (data !== null)
            if (data.includes(func))
                return true;
        return false;
    }

    useEffect( () => {
        let array;
        async function fetchData() {
            array = await GetFunctional();
            setFunctional(array);
        }
        fetchData();
    }, [])
    return (
        <Popover ref={ref} className={className} style={{ left, top }} full>
            <Dropdown.Menu onSelect={handleSelect}>
                <Dropdown.Item eventKey="1" >
                    <NavLink tag={Link} to={ApplicationPaths.IdentityManagePath}>
                        Профиль
                    </NavLink>
                </Dropdown.Item>
                {
                    checkPermission(ClientRoutes.SUBSCRIPTIONS)
                        ?
                        <Dropdown.Item >
                            <NavLink tag={Link} to={ClientRoutes.PREFIX + ClientRoutes.SUBSCRIPTIONS}>
                                Подписки
                            </NavLink>
                        </Dropdown.Item>
                        :
                        null
                }
                {
                    checkPermission(ClientRoutes.MODELS)
                        ?
                        <Dropdown.Item eventKey="2">
                            <NavLink tag={Link} to={ClientRoutes.PREFIX + ClientRoutes.MODELS}>
                                Модели
                            </NavLink>
                        </Dropdown.Item>
                        :
                        null
                }
                {
                    checkPermission(ClientRoutes.REGISTER_COMPANY)
                        ?
                        <Dropdown.Item eventKey="3" >
                            <NavLink tag={Link} to={ClientRoutes.PREFIX + ClientRoutes.REGISTER_COMPANY}>
                                Зарегистрировать компанию
                            </NavLink>
                        </Dropdown.Item>
                        :
                        null
                }
                {
                    checkPermission(ClientRoutes.COMPANY_INVITE)
                        ?
                        <Dropdown.Item eventKey="4" >
                            <NavLink tag={Link} to={ClientRoutes.PREFIX + ClientRoutes.COMPANY_INVITE}>
                                Пригласить в компанию
                            </NavLink>
                        </Dropdown.Item>
                        :
                        null
                }

            </Dropdown.Menu>
        </Popover>
    );


};
export default RenderProfileContent;