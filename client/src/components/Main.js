import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './authComponents/PrivateRoute';

import Landing from '../components/Landing';
import SignupPage from '../containers/SignupPage';
import LoginPage from '../containers/LoginPage';
import DashContainerPage from '../containers/DashContainerPage';
import AuthorizePage from '../containers/AuthorizePage';
// import HomePage from '../containers/HomePage';
// import AssignReviews from '../containers/AssignReviewsPage';
// import ViewReviewsPage from '../containers/ViewReviewsPage';
// import AuthorizeUser from './dashComponents/AuthorizeUser';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/verifyAuthorize" component={AuthorizePage} />
          <PrivateRoute path="/signup" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route exact path="/user" component={DashContainerPage} />
        </Switch>
      </main>
    );
  }
}

export default Main;
