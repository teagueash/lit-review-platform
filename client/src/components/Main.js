import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing';
import LoginPage from '../containers/LoginPage';
import DashContainerPage from '../containers/DashContainerPage';
import AuthorizePage from '../containers/AuthorizePage';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/verifyAuthorize" component={AuthorizePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/user" component={DashContainerPage} />
        </Switch>
      </main>
    );
  }
}

export default Main;
