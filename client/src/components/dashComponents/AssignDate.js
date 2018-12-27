import React, { Fragment } from 'react';
import Calendar from 'react-calendar';

const AssignDate = ({ handleChange, dueDate }) => (
  <Fragment>
    <h3 className="assign-direction">Pick a due date</h3>
    <div className="assign-carousel-content">
      <div className={'assign-calendar-div'}>
        <Calendar onChange={handleChange} value={dueDate} />
      </div>
    </div>
  </Fragment>
);

export default AssignDate;
