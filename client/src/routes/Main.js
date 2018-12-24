import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import DashRoutes from './DashRoutes';
import Sidebar from '../components/Sidebar';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path="/user" component={DashRoutes} />
          <Route path="/" component={AuthRoutes} />
        </Switch>
      </main>
    );
  }
}

export default Main;
