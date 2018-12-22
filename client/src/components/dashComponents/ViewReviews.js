import React from 'react';
import { Spring } from 'react-spring';
import Review from './Review';

const ViewReviews = ({ allReviews }) => (
  <div className="view-all-container">
    <div className="view-content">
      {allReviews.map(review => (
        <Review key={review._id} content={review} />
      ))}
    </div>
  </div>
);

export default ViewReviews;
