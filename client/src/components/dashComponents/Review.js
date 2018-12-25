import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import BackButton from '../../containers/BackButton';
import DeleteButton from '../../containers/DeleteButton';

const Review = ({ review, uploadReview, isAdmin }) => {
  const { _id, date, topic, assignedTo } = review;

  const dateObject = new Date(date);

  return (
    <div className="view-mounted-review-container">
      <div className="view-mounted-review-card">
        <div className="button-container">
          <BackButton className={'fas fa-long-arrow-alt-left fa-button'} />
          {isAdmin && (
            <DeleteButton data={_id} className={'fa fa-trash-o fa-button'} />
          )}
        </div>
        <h4 className="view-mounted-text">{topic}</h4>
        <h4 className="view-mounted-text">{assignedTo}</h4>
        <h4 className="view-mounted-text">{`${dateObject.getMonth() +
          1} ${dateObject.getDate()} ${dateObject.getFullYear()}`}</h4>
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
    </div>
  );
};

export default Review;
