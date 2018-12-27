import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewsList from '../components/dashComponents/ReviewsList';
import enhancedViewReviews from '../HOCs/enhancedViewReviews';

class ReviewsListPage extends Component {
  // Receive either all or user-specific assigned tasks based off privilege
  render() {
    const { data } = this.props;

    return <ReviewsList data={data} />;
  }
}

export default enhancedViewReviews(ReviewsListPage);
