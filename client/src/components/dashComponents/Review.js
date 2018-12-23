import React from 'react';
import { Spring } from 'react-spring';
import { connect } from 'react-redux';

const Review = ({ auth, content, onChange, isHovering, setReview }) => (
  <Spring delay={300} from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {({ opacity }) => (
      <div style={{ opacity }} className="view-content">
        <div
          onMouseEnter={onChange}
          onMouseLeave={onChange}
          onClick={setReview}
          className="view-review-card"
        >
          <h4>{content.topic}</h4>
          {isHovering && auth === 'admin' && (
            <div>
              <i className="fa fa-trash-o delete-button fa-button" />
              <i
                onClick={() => this.downloadReview(content)}
                className="fas fa-cloud-download-alt delete-button fa-button"
              />
            </div>
          )}
          {isHovering && auth === 'student' && (
            <div>
              <i
                onClick={() => console.log('clicked')}
                className="far fa-eye delete-button fa-button"
              />
            </div>
          )}
        </div>
      </div>
    )}
  </Spring>
);

export default Review;
