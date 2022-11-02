import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import NotificationDropDown from "../navMenu/components/notification/NotificationDropDown";
import ProfileDropDown from "../navMenu/components/profile/ProfileDropDown";
import ThemeToggler from "../navMenu/components/ThemeToggler";
import { ThemeContextConsumer } from '../ThemeContext';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import authService from './AuthorizeService';
export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, logoutPath);
        }
    }

    authenticatedView(userName, logoutPath) {
        return (
            <ThemeContextConsumer>{
                    context => (
                        <Fragment>
                            <NotificationDropDown/>
                            <ProfileDropDown direction="down" />
                        </Fragment>
                        )
                }
            </ThemeContextConsumer>);

    }

    anonymousView(registerPath, loginPath) {
        return (
            <ThemeContextConsumer>{
                context=>(
                    <Fragment>
                        <ThemeToggler />
                        <NavItem>
                            <NavLink className={context.theme} tag={Link} to={registerPath}>Зарегистрироваться</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={context.theme} tag={Link} to={loginPath}>Войти</NavLink>
                        </NavItem>
                    </Fragment>
                )
            }
            </ThemeContextConsumer>
                );
    }
}
