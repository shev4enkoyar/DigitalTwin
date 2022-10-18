import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import  Home  from './pages/home/Home.js'
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths, QueryParameterNames} from './components/api-authorization/ApiAuthorizationConstants';
import './custom.css'
import Tariffs from "./pages/Tariffs/Tariffs";
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
                        <Route exact path='/' component={Home } />
                        <AuthorizeRoute path={ApplicationPaths.IdentityManagePath} component={ApiAuthorizationRoutes} />
                        <AuthorizeRoute path="/registerCompany" component={CreateCompany } />
                        <AuthorizeRoute path="/tariffs" component={Tariffs } />
                        <AuthorizeRoute path="/tariffs-all" component={AllTariffs } />
                        <AuthorizeRoute path='/counter' component={Counter } />
                        <AuthorizeRoute path='/fetch-data' component={FetchData } />
                        <AuthorizeRoute path="/dashboard/:modelId" component={Dashboard} />


                        <AuthorizeRoute path="/dashboardEmpty" component={DashboardEmpty} />
                        <AuthorizeRoute path="/map/:modelId" component={MapMain} />
                        <AuthorizeRoute path="/recom" component={Recommendations } />

                        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />

                        <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.MODELS} component={Models} name={ClientRoutes.MODELS}/>
                        <AuthorizeRouteWithPermission path={ClientRoutes.PREFIX + ClientRoutes.CREATE_MODEL} component={CreateModel} name={ClientRoutes.CREATE_MODEL}/>

                        <Redirect from="*" to="/" />
                    </Switch>

                </Layout>
        );
  }
}
