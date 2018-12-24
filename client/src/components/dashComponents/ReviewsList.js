import React from 'react';
import { Spring } from 'react-spring';
import ReviewCard from '../../containers/ReviewCard';

const ReviewsList = ({ data }) => (
  <div className="view-reviews-container">
    <h1 className="dash-title-text">View All Reviews</h1>
    <div className="view-content">
      {data.map(review => (
        <ReviewCard key={review._id} content={review} />
      ))}
    </div>
  </div>
);

export default ReviewsList;
