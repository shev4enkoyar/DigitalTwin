
import React, {Component} from "react";
import {ApplicationPaths} from "../../api-authorization/ApiAuthorizationConstants";
import {Link} from "react-router-dom";
import {NavLink} from "reactstrap";
import authService from "../../api-authorization/AuthorizeService";
import { ClientRoutes } from "../../../util/ClientRoutes";
import { ThemeContextConsumer } from './../../ThemeContext';
import '../NavMenu.css'
import {Button, Dropdown, Popover, Whisper} from "rsuite";
import RenderProfileContent from "./renderProfileContent";


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
        let content = (
            <Popover full>
                {/*<Dropdown key="1" className="background-transparent" id="dropdown-basic-button" title={<img className={context.theme + "Icon" + " icon"} src="https://www.svgrepo.com/show/333287/profile.svg"/>}>*/}
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1"  href={ApplicationPaths.IdentityManagePath}>Профиль</Dropdown.Item>
                    {
                        this.checkPermission(ClientRoutes.SUBSCRIPTIONS)
                            ?
                            <Dropdown.Item href={ClientRoutes.PREFIX + ClientRoutes.SUBSCRIPTIONS}>Подписки</Dropdown.Item>
                            :
                            null
                    }
                    {
                        this.checkPermission(ClientRoutes.MODELS)
                            ?
                            <Dropdown.Item eventKey="2" href={ClientRoutes.PREFIX + ClientRoutes.MODELS}>Модели</Dropdown.Item>
                            :
                            null
                    }
                    {
                        this.checkPermission(ClientRoutes.REGISTER_COMPANY)
                            ?
                            <Dropdown.Item eventKey="3" href={ClientRoutes.PREFIX + ClientRoutes.REGISTER_COMPANY}>Зарегистрировать компанию</Dropdown.Item>
                            :
                            null
                    }
                    {
                        this.checkPermission(ClientRoutes.COMPANY_INVITE)
                            ?
                            <Dropdown.Item eventKey="4" href={ClientRoutes.PREFIX + ClientRoutes.COMPANY_INVITE}>Пригласить в компанию</Dropdown.Item>
                            :
                            null
                    }

                    <Dropdown.Item eventKey="5" >
                        <NavLink tag={Link} to={this.props.logoutPath}>
                            Выйти
                        </NavLink>
                    </Dropdown.Item>
                </Dropdown.Menu>
                {/*</Dropdown>*/}
            </Popover>
        )
        return (
          <ThemeContextConsumer>
           {context => (
               <Whisper placement="bottomStart" trigger="click" speaker={RenderProfileContent}>
                   <Button className="background-transparent">
                       <img className={context.theme + "Icon" + " icon"} src="https://www.svgrepo.com/show/333287/profile.svg"/>
                   </Button>

               </Whisper>
          )}
        </ThemeContextConsumer>
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