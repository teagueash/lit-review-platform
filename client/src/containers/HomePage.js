import React, { Component } from 'react';
import ViewUpcoming from '../components/dashComponents/ViewUpcoming';
import enhancedHomePage from '../HOCs/enhancedHomePage';
import { taskAPI } from '../API';
import auth from '../modules/auth';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      schedule: []
    };
  }

  // set home page name and update state.name and state.schedule based off HOC API call
  componentDidMount() {
    const { data, dateRange } = this.props;

    const name = JSON.parse(auth.getUser()).name.split(' ')[0];
    this.setName(name);

    // transform date string back into date object
    data.map(review => (review.date = new Date(review.date)));

    this.setSchedule(data, dateRange);
  }

  setName = name => {
    this.setState({ name });
  };

  // initialize mapping of key, value pair for day of week key to review list
  getNextFiveDays = dateRange => {
    const schedule = new Map();
    dateRange.map(date => {
      schedule.set(date.getDay(), []);
    });

    return schedule;
  };

  // Assign key value pairs to reflect <day of week> to <[reviews]> relationship
  setSchedule = (data, dateRange) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const schedule = this.getNextFiveDays(dateRange);

    data.map(review => {
      const { date } = review;
      const day = date.getDay();
      const arrayVal = schedule.get(day);

      schedule.set(day, [...arrayVal, review]);
    });

    // transform to array for access to .map
    this.setState({ schedule: Array.from(schedule) });
  };

  render() {
    const { schedule, name } = this.state;

    return <ViewUpcoming name={name} schedule={schedule} />;
  }
}

export default enhancedHomePage(HomePage);
