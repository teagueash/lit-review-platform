import React from 'react';
import { Spring } from 'react-spring';
import ReviewCard from '../../containers/ReviewCard';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ViewUpcoming = ({ name, schedule }) => (
  <div className="home-container">
    <Spring delay={200} from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {({ opacity }) => (
        <div className="user-dash-container" style={{ opacity }}>
          <h1 className="home-text">{`Welcome back, ${name}`}</h1>
          <h2 className="home-headline-text">Upcoming Deadlines</h2>
          <div style={{ opacity }} className="view-home-content">
            {schedule.map(pair => {
              const dayOfWeek = pair[0];
              const reviewArray = pair[1];
              return (
                <div className="home-column" key={dayOfWeek}>
                  <h1 className="home-column-text">{weekdays[dayOfWeek]}</h1>
                  {reviewArray.map(review => (
                    <ReviewCard key={review._id} content={review} />
                  ))}
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
