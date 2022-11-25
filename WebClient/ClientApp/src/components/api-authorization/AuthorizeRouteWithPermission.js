import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { ApplicationPaths, QueryParameterNames } from './ApiAuthorizationConstants'
import authService from './AuthorizeService'
import { withRouter } from "react-router";

export default class AuthorizeRouteWithPermission extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            authenticated: false,
            functional: []
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.authenticationChanged());
        this.populateAuthenticationState();
        this.GetFunctional();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

     checkPermission(functional){
        let currentId = window.location.href.split('/')[4];
        if (currentId != undefined && currentId != null)
            functional += "/" + currentId;
        let data = this.state.functional;
        if (data.includes(functional))
            return true;
        return true;
    }

    render() {
        const noPermission = <h1 className="text-center" style={{color: "#FFF"}}>У вас нет доступа к данному ресурсу</h1>;
        const { ready, authenticated } = this.state;
        var link = document.createElement("a");
        link.href = this.props.path;
        const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
        const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURI(returnUrl)}`
        if (!ready) {
            return <div></div>;
        } else {
            const { component: Component, ...rest } = this.props;
            return <Route {...rest}
                          render={(props) => {
                              if (authenticated) {
                                  if (this.checkPermission(this.props.name))
                                      return <Component {...props} />
                                  else
                                      return noPermission;
                              } else {
                                  return <Redirect to={redirectUrl} />
                              }
                          }} />
        }
    }

    async populateAuthenticationState() {
        const authenticated = await authService.isAuthenticated();
        this.setState({ ready: true, authenticated });
    }

    async authenticationChanged() {
        this.setState({ ready: false, authenticated: false });
        await this.populateAuthenticationState();
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