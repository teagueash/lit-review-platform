import React from 'react';
import { Spring } from 'react-spring';
import { connect } from 'react-redux';
import DeleteButton from '../../containers/DeleteButton';
import DownloadButton from '../../containers/DownloadButton';

const ReviewElement = ({
  auth,
  content,
  onChange,
  isHovering,
  setReview,
  setRemove
}) => (
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
            <div className="button-container">
              <DeleteButton
                setRemove={setRemove}
                data={content._id}
                className="fas fa-trash-alt fa-button"
              />
              <DownloadButton
                data={content._id}
                className="fas fa-cloud-download-alt fa-button"
              />
            </div>
          )}
        </div>
      </div>
    )}
  </Spring>
);

export default ReviewElement;
