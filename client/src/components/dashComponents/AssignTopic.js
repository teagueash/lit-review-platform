import React, { Fragment } from 'react';

const AssignTopic = ({ handleChange, topic, next }) => (
  <Fragment>
    <h3 className="assign-direction">Assign a topic</h3>
    <div className="assign-carousel-content">
      <textarea
        className={'assign-text-area'}
        placeholder={'begin typing here'}
        value={topic}
        onChange={handleChange}
        rows={4}
        spellCheck={true}
      />
      <button onClick={() => next(2)} className="next-button">
        next
      </button>
    </div>
  </Fragment>
);

export default AssignTopic;
