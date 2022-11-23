import React, { Component } from 'react';
import { Switch } from "react-router";
import { Redirect, Route } from 'react-router-dom';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import AuthorizeRouteWithPermission from "./components/api-authorization/AuthorizeRouteWithPermission";
import { Layout } from './components/layout/Layout';
import './custom.css';
import { CompanyInvite } from "./pages/companyInvite/CompanyInvite";
import { CreateCompany } from "./pages/createCompany/CreateCompany";
import CreateModel from "./pages/createModel/CreateModel";
import { Dashboard } from "./pages/Dashboard";
import DashboardEmpty from "./pages/dashboardEmpty/DashboardEmpty";
import Home from './pages/home/Home.js';
import IotPage from './pages/iotPage/IotPage';
import MapMain from "./pages/map/MapMain";
import Models from "./pages/models/Models";
import Recommendations from "./pages/Recommendations";
import AllSubscriptions from "./pages/Tariffs/AllSubscriptions";
import Subscriptions from "./pages/Tariffs/Subscriptions";
import Docs from "./pages/Docs/Docs";
import { ClientRoutes } from "./util/ClientRoutes";
import GanttMain from './pages/gant/gant_main';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { functional: [] };
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <AuthorizeRoute path="/dashboardEmpty" component={DashboardEmpty} />
                    <Route exact path={ClientRoutes.PREFIX} component={Home} />
                    <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                    <AuthorizeRoute path={ApplicationPaths.IdentityManagePath} component={ApiAuthorizationRoutes} />
                    <AuthorizeRoute path={ClientRoutes.PREFIX + ClientRoutes.SUBSCRIPTIONS} component={Subscriptions} />
                    <AuthorizeRoute path={ClientRoutes.PREFIX + ClientRoutes.SUBSCRIPTIONS_ALL} component={AllSubscriptions} />

                    <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.GANT + ClientRoutes.SUFFIX_MODEL_ID} component={GanttMain } name={ClientRoutes.GANT} />
                    <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.RECOMMENDATIONS + ClientRoutes.SUFFIX_MODEL_ID} component={Recommendations } name={ClientRoutes.RECOMMENDATIONS} />
                    <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.IOTPAGE + ClientRoutes.SUFFIX_MODEL_ID} component={IotPage } name={ClientRoutes.IOTPAGE} />
                    <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.DOCS + ClientRoutes.SUFFIX_MODEL_ID} component={Docs } name={ClientRoutes.DOCS} />
                    <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.DASHBOARD + ClientRoutes.SUFFIX_MODEL_ID} component={Dashboard } name={ClientRoutes.DASHBOARD} />
                    <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.MAP + ClientRoutes.SUFFIX_MODEL_ID} component={MapMain } name={ClientRoutes.MAP} />
                    <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.REGISTER_COMPANY} component={CreateCompany} name={ClientRoutes.REGISTER_COMPANY} />
                    <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.COMPANY_INVITE} component={CompanyInvite} name={ClientRoutes.COMPANY_INVITE} />
                    <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.MODELS} component={Models} name={ClientRoutes.MODELS} />
                    <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.CREATE_MODEL} component={CreateModel} name={ClientRoutes.CREATE_MODEL} />

                    <Redirect from="*" to="/" />
                </Switch>
            </Layout>
        );
    }
}
