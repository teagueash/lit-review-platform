import React from 'react';
import { Spring } from 'react-spring';
import Calendar from 'react-calendar';

const AssignDate = ({ handleChange, dueDate, back }) => (
  <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {({ opacity }) => (
      <div style={{ opacity }} className="assign-carousel-item-3">
        <h3 className="assign-direction">Pick a due date</h3>
        <div className="button-container">
          <i
            onClick={back}
            className={'fas fa-long-arrow-alt-left fa-button button'}
          />
        </div>
        <div className="assign-carousel-content">
          <div className={'assign-calendar-div'}>
            <Calendar onChange={handleChange} value={dueDate} />
          </div>
        </div>
      </div>
    )}
  </Spring>
);

export default AssignDate;
