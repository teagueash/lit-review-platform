import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewReviews from '../components/dashComponents/ViewReviews';
import enhancedViewReviews from '../HOCs/enhancedViewReviews';

class ViewReviewsPage extends Component {
  // Receive either all or user-specific assigned tasks based off privilege
  componentDidMount() {
    const { data } = this.props;

    this.setState({ allReviews: data });
  }

  render() {
    const { data } = this.props;

    return <ViewReviews allReviews={data} />;
  }
}

export default enhancedViewReviews(ViewReviewsPage);
