import React, { Component } from 'react';
import { taskAPI } from '../API';
import auth from '../modules/auth';

// injects 1. data from an api call based off auth status
//         2. an array of date objects representing the desired range
const enhancedHomePage = WrappedComponent => {
  return class extends Component {
    state = {
      res: null,
      dateRange: null
    };

    // set state for @res and @dateRange
    componentDidMount() {
      this.generateSchedule(5);
    }

    // returns auth status
    checkAuth = () => {
      const { role } = JSON.parse(auth.getUser());
      return role === 'admin';
    };

    // generates date array for @range days and passes array to @getUpcomingReviews
    generateSchedule = range => {
      const start = new Date();
      const dateRange = [];
      for (var i = 0; i < range; ++i) {
        const day = new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate() + i
        );
        dateRange.push(day);
      }

      this.getUpcomingReviews(dateRange);
    };

    // checks auth status and sets state based off api call and passed argument
    getUpcomingReviews = async dateRange => {
      const start = dateRange[0];
      const end = dateRange[dateRange.length - 1];

      this.checkAuth()
        ? this.setState({
            res: await taskAPI.viewUpcomingTasks({ start, end }),
            dateRange
          })
        : this.setState({
            res: await taskAPI.viewMyUpcomingTasks({ start, end }),
            dateRange
          });
    };

    render() {
      const { res, dateRange } = this.state;
      // return wrapped component with injected props if a response was logged from API
      return res ? (
        <WrappedComponent
          data={res.data}
          dateRange={dateRange}
          {...this.props}
        />
      ) : null;
    }
  };
};

export default enhancedHomePage;
