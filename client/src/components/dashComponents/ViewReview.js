import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import auth from '../../modules/auth';

const ViewReview = ({ review, dismountReview, deleteReview, uploadReview }) => {
  const { date, topic, assignedTo, _id, submitted } = review;

  // role used to determine what additional elements user gets to see
  const user = JSON.parse(auth.getUser());
  const { role } = user;

  const dateObject = new Date(date);
  console.log('View One Component Page');
  console.log(this);
  return (
    <div className="view-mounted-container">
      <div key={_id} className="view-mounted-review-card">
        <div className="button-container">
          <i
            onClick={() => dismountReview()}
            className={`fas fa-long-arrow-alt-left fa-1x back-button back-button-${role}`}
          />
          {role === 'admin' && (
            <i
              className="fa fa-trash-o delete-button"
              onClick={() => deleteReview(review._id)}
            />
          )}
        </div>
        <h4 className="view-mounted-text">{topic}</h4>
        <h4 className="view-mounted-text">{assignedTo}</h4>
        <h4 className="view-mounted-text">{`${dateObject.getMonth()} ${dateObject.getDate()} ${dateObject.getFullYear()}`}</h4>
      </div>
      {role === 'student' && (
        <div className="dash-dropzone">
          <Dropzone
            onDrop={file => {
              uploadReview(file, review);
            }}
          >
            <div className="dropzone-content">
              <p>drag&drop files here</p>
              <p>or</p>
              <button className="dropzone-button">browse files</button>
            </div>
          </Dropzone>
        </div>
      )}
    </div>
  );
};

export default ViewReview;
