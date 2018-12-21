import React from 'react';
import { Spring } from 'react-spring';
import Review from './Review';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ViewUpcoming = ({
  name,
  upcomingReviews,
  getDayOfWeek,
  daysOfWeek,
  formatDate,
  mountReview
}) => (
  <div className="home-container">
    <Spring delay={200} from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {({ opacity }) => (
        <div className="user-dash-container" style={{ opacity }}>
          <h1 className="home-text">{`Welcome back, ${name}`}</h1>
          <h2 className="home-headline-text">Upcoming Deadlines</h2>
          <div style={{ opacity }} className="view-home-content">
            {daysOfWeek.map(date => {
              return (
                <div className="home-column" key={date.getDay()}>
                  <h1 className="home-column-text">
                    {weekdays[date.getDay()]}
                  </h1>
                  {upcomingReviews
                    .filter(review => {
                      const reviewDay = formatDate(review.date);
                      return reviewDay === date.getDate();
                    })
                    .map(review => {
                      return (
                        <Review
                          key={review._id}
                          content={review}
                          mountReview={mountReview}
                        />
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Spring>
  </div>
);

export default ViewUpcoming;
