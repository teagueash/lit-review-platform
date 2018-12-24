import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from '../containers/HomePage';
import AssignReviews from '../containers/AssignReviewsPage';
import ReviewsListPage from '../containers/ReviewsListPage';
import AuthorizeUser from '../components/dashComponents/AuthorizeUser';
import ReviewPage from '../containers/ReviewPage';
import Sidebar from '../components/Sidebar';

class DashRoutes extends Component {
  render() {
    return (
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/user/home" component={HomePage} />
          <Route path="/user/assign" component={AssignReviews} />
          <Route exact path="/user/view" component={ReviewsListPage} />
          <Route path="/user/authorize" component={AuthorizeUser} />
          <Route
            path={['/user/home/review', '/user/view/review']}
            component={ReviewPage}
          />
        </Switch>
      </div>
    );
  }
}

// work around to pass array of strings to <Route path="" />
Route.propTypes = {
  computedMatch: PropTypes.object,
  path: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  sensitive: PropTypes.bool,
  component: PropTypes.func,
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  location: PropTypes.object
};

export default DashRoutes;
