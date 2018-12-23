import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

const ViewReview = ({
  review,
  uploadReview,
  deleteReview,
  setPrevPath,
  isAdmin
}) => {
  const { _id, date, topic, assignedTo, submitted } = review;

  const dateObject = new Date(date);

  return (
    <div className="view-mounted-review-card">
      <div className="button-container">
        <i
          onClick={setPrevPath}
          className={'fas fa-long-arrow-alt-left fa-1x back-button'}
        />
        {isAdmin && (
          <i className="fa fa-trash-o delete-button" onClick={deleteReview} />
        )}
      </div>
      <h4 className="view-mounted-text">{topic}</h4>
      <h4 className="view-mounted-text">{assignedTo}</h4>
      <h4 className="view-mounted-text">{`${dateObject.getMonth()} ${dateObject.getDate()} ${dateObject.getFullYear()}`}</h4>
      {!isAdmin && (
        <div className="dash-dropzone">
          <Dropzone onDrop={file => uploadReview(file, review)}>
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
