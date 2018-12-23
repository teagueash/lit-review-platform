import React from 'react';
import { Spring } from 'react-spring';
import ReviewContainer from '../../containers/ReviewContainer';

const ViewReviews = ({ allReviews }) => (
  <div className="view-all-container">
    <div className="view-content">
      {allReviews.map(review => (
        <ReviewContainer key={review._id} content={review} />
      ))}
    </div>
  </div>
);

export default ViewReviews;
