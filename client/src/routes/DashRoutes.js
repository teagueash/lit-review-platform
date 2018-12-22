import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../containers/HomePage';
import AssignReviews from '../containers/AssignReviewsPage';
import ViewReviewsPage from '../containers/ViewReviewsPage';
import AuthorizeUser from '../components/dashComponents/AuthorizeUser';
import ViewReview from '../components/dashComponents/ViewReview';
import Sidebar from '../components/Sidebar';

class DashRoutes extends Component {
  render() {
    return (
      <Fragment>
        <Sidebar />
        <Switch>
          <Route path="/user/home" component={HomePage} />
          <Route path="/user/assign" component={AssignReviews} />
          <Route path="/user/view" component={ViewReviewsPage} />
          <Route path="/user/authorize" component={AuthorizeUser} />
          <Route path="/user/view/review" component={ViewReview} />
        </Switch>
      </Fragment>
    );
  }
}

export default DashRoutes;
