import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Landing from '../components/Landing';
import SignupPage from '../containers/SignupPage';
import LoginPage from '../containers/LoginPage';
import AuthorizePage from '../containers/AuthorizePage';

class AuthRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/verifyAuthorize" component={AuthorizePage} />
        <PrivateRoute path="/signup" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    );
  }
}

export default AuthRoutes;
