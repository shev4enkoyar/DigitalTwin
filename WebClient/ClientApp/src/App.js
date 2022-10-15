import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import  Home  from './pages/home/Home.js'
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import './custom.css'
import Tariffs from "./pages/Tariffs/Tariffs";
import Models from "./pages/models/Models";
import CreateModel from "./pages/createModel/CreateModel";
import DashboardEmpty from "./pages/dashboardEmpty/DashboardEmpty";
import MapMain from "./pages/map/MapMain";
import Recommendations from "./pages/Recommendations";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
            <Layout>
                <Route exact path='/' component={Home } />
                <AuthorizeRoute path={ApplicationPaths.IdentityManagePath} component={ApiAuthorizationRoutes} />
                <AuthorizeRoute path="/tariffs" component={Tariffs } />
                <AuthorizeRoute path='/counter' component={Counter } />
                <AuthorizeRoute path='/fetch-data' component={FetchData } />

                <Route path="/createModel" component={CreateModel} />
                <Route path="/dashboard" component={DashboardEmpty} />
                <Route path="/map" component={MapMain} />
                <Route path="/recom" component={Recommendations } />

                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                <Route path="/models" component={Models } />
            </Layout>
    );
  }
}
