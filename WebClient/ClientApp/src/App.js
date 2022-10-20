import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import  Home  from './pages/home/Home.js'
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths, QueryParameterNames} from './components/api-authorization/ApiAuthorizationConstants';
import './custom.css'
import Subscriptions from "./pages/Tariffs/Subscriptions";
import Models from "./pages/models/Models";
import CreateModel from "./pages/createModel/CreateModel";
import DashboardEmpty from "./pages/dashboardEmpty/DashboardEmpty";
import MapMain from "./pages/map/MapMain";
import Recommendations from "./pages/Recommendations";
import {Dashboard} from "./pages/Dashboard";
import {Switch} from "react-router";
import authService from "./components/api-authorization/AuthorizeService";
import {ClientRoutes} from "./util/ClientRoutes";
import AuthorizeRouteWithPermission from "./components/api-authorization/AuthorizeRouteWithPermission";
import AllTariffs from "./pages/Tariffs/AllTariffs";
import {CreateCompany} from "./pages/createCompany/CreateCompany";
import {CompanyInvite} from "./pages/companyInvite/CompanyInvite";

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { functional: [] };
    }

    render () {


        return (
                <Layout>
                    <Switch>
                        <AuthorizeRoute path="/dashboardEmpty" component={DashboardEmpty} />
                        <Route exact path={ClientRoutes.PREFIX} component={Home } />
                        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                        <AuthorizeRoute path={ApplicationPaths.IdentityManagePath} component={ApiAuthorizationRoutes} />
                        <AuthorizeRoute path={ClientRoutes.PREFIX + ClientRoutes.SUBSCRIPTIONS}  component={Subscriptions } />
                        <AuthorizeRoute path={ClientRoutes.PREFIX + ClientRoutes.SUBSCRIPTIONS_ALL}  component={AllTariffs } />
                        <AuthorizeRoute path={ClientRoutes.PREFIX + ClientRoutes.RECOMMENDATIONS}  component={Recommendations } />
                        <AuthorizeRoute path={ClientRoutes.PREFIX + ClientRoutes.COMPANY_INVITE}  component={CompanyInvite } />
                        <AuthorizeRoute path={ClientRoutes.PREFIX + ClientRoutes.DASHBOARD + ClientRoutes.SUFFIX_MODEL_ID}  component={Dashboard} />
                        <AuthorizeRoute path={ClientRoutes.PREFIX + ClientRoutes.MAP + ClientRoutes.SUFFIX_MODEL_ID}  component={MapMain} />
                        <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.REGISTER_COMPANY} component={CreateCompany} name={ClientRoutes.REGISTER_COMPANY}/>
                        <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.MODELS} component={Models} name={ClientRoutes.MODELS}/>
                        <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.CREATE_MODEL} component={CreateModel} name={ClientRoutes.CREATE_MODEL}/>

                        <Redirect from="*" to="/" />
                    </Switch>

                </Layout>
        );
  }
}
