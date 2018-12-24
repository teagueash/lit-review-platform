import React, { Component } from 'react';
import { taskAPI } from '../API';
import auth from '../modules/auth';

const enhancedViewReviews = WrappedComponent => {
  return class extends Component {
    state = {
      res: null
    };

    // make API call based off permissions
    async componentDidMount() {
      const { role } = JSON.parse(auth.getUser());
      const isAdmin = role === 'admin';

      isAdmin
        ? this.setState({ res: await taskAPI.viewTasks() })
        : this.setState({ res: await taskAPI.viewMyTasks() });
    }

    render() {
      const { res } = this.state;
      // return wrapped component with injected prop if a response was logged from API
      return res ? <WrappedComponent data={res.data} {...this.props} /> : null;
    }
  };
};

export default enhancedViewReviews;
