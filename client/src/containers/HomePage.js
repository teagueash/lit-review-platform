import React, { Component } from 'react';
import ViewUpcoming from '../components/dashComponents/ViewUpcoming';
import auth from '../modules/auth';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      upcomingReviews: [],
      thisWeek: []
    };
  }

  // creates a five day forecast sets upcomingReviews state to pass to
  // <ViewUpcoming />
  async componentDidMount() {
    const { viewUpcomingTasks } = this.props;

    const name = JSON.parse(auth.getUser()).name;
    this.setName(name);

    const today = new Date();
    const nextWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 5
    );

    this.generateSchedule(today);

    const res = await viewUpcomingTasks({ today, nextWeek });
    if (res.status === 200) {
      const { data } = res;
      this.setUpcomingReviews({ upcomingReviews: data });
    } else {
      // error
      console.log('error occurred: ', res);
    }
  }

  setName = name => {
    name = name.split(' ')[0];
    this.setState({ name });
  };

  setUpcomingReviews = upcomingReviews => {
    this.setState(upcomingReviews);
  };

  setThisWeek = thisWeek => {
    this.setState(thisWeek);
  };

  // determines the days of week to render (only shows next 5 days)
  generateSchedule = today => {
    const thisWeek = [];
    for (var i = 0; i < 5; ++i) {
      const day = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );
      thisWeek.push(day);
    }
    this.setThisWeek({ thisWeek });
  };

  getDayOfWeek = date => {
    const dateArray = date.split(' ');
    const reviewDate = new Date(
      dateArray[2],
      dateArray[0],
      dateArray[1]
    ).toString();
    return reviewDate;
  };

  // converts date object to a single number to compare against day of the week
  // for formatting all <Review /> cards
  formatDate = date => {
    const dateArray = date.substring(0, date.indexOf('T')).split('-');
    var formattedDate = dateArray[2];
    if (formattedDate.indexOf('0') === 0) {
      // leading 0, remove
      formattedDate = formattedDate.substring(1);
    }
    return parseInt(formattedDate);
  };

  render() {
    const { upcomingReviews, thisWeek, name } = this.state;
    const { mountReview } = this.props;

    return (
      <ViewUpcoming
        name={name}
        upcomingReviews={upcomingReviews}
        getDayOfWeek={this.getDayOfWeek}
        daysOfWeek={thisWeek}
        formatDate={this.formatDate}
        mountReview={mountReview}
      />
    );
  }
}

export default HomePage;
