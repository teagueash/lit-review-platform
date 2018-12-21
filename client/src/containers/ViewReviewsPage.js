import React, { Component } from 'react';
import ViewReviews from '../components/dashComponents/ViewReviews';

class ViewReviewsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allReviews: []
    };
  }

  // Generates tasks based off user privilege
  async componentDidMount() {
    const { viewTasks } = this.props;

    const res = await viewTasks();
    if (res.status === 200) {
      const { data } = res;
      this.setState({ allReviews: data });
    } else {
      // error
      console.log('error occured: ', res);
    }
  }

  render() {
    const { allReviews } = this.state;
    const { mountReview } = this.props;

    return <ViewReviews allReviews={allReviews} mountReview={mountReview} />;
  }
}

export default ViewReviewsPage;
