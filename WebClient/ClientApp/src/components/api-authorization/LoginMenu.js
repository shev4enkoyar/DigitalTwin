import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import ProfileDropdown from "../navMenu/components/profile/ProfileDropdown";
import { ThemeContextConsumer } from '../ThemeContext';
import ThemeToggler from "../navMenu/components/ThemeToggler";
import NotificationDropdown from "../navMenu/components/notification/NotificationDropdown";
import AnonymousDropdown from "../navMenu/components/AnonymousDropdown";
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
                            <Button style={{ backgroundColor: 'transparent', border: 'none' }} className={context.theme + "shadow-none"} >
                                <Link to="/adminPanel">
                                    <img fill="#000000" src="https://www.svgrepo.com/show/355353/user-admin.svg" className={context.theme} style={{ filter: 'invert(1)', width: '20px', height: '20px' }} />
                                </Link>
                            </Button>
                            <NotificationDropdown />
                            <ProfileDropdown direction="down" />
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
                        <AnonymousDropdown/>
                    </Fragment>
                )
            }
            </ThemeContextConsumer>
                );
    }
}
