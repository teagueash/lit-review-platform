import React from 'react';
import { Spring } from 'react-spring';
import BackButton from '../../containers/BackButton';

const AssignTopic = ({ handleChange, topic, next, back }) => (
  <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {({ opacity }) => (
      <div style={{ opacity }} className="assign-carousel-item-2">
        <h3 className="assign-direction">Assign a topic</h3>
        <div className="button-container">
          <i
            onClick={back}
            className="fas fa-long-arrow-alt-left fa-button button"
          />
          <i
            onClick={next}
            className="fas fa-long-arrow-alt-right fa-button button"
          />
        </div>
        <div className="assign-carousel-content-2">
          <textarea
            className={'assign-text-area'}
            placeholder={'begin typing here'}
            value={topic}
            onChange={handleChange}
            rows={4}
            spellCheck={true}
          />
        </div>
      </div>
    )}
  </Spring>
);

export default AssignTopic;
