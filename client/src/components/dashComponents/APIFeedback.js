import React, { Component, Fragment } from 'react';
import { Spring } from 'react-spring';

import { taskAPI } from '../../API';

class APIFeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false
    };
  }

  // make post request to api to update assignedUsers tasklist
  submitAssignment = async () => {
    const { data, topic, dueDate } = this.props;
    const { name, id } = data.user;
    console.log('trying to submit assignment');
    const taskData = {
      name,
      id,
      topic,
      dueDate
    };

    const res = await taskAPI.assignTask(taskData);
    res.status === 200
      ? this.setState({ status: true })
      : this.setState({ status: false });
  };

  render() {
    const { status } = this.state;
    const { data, topic, dueDate, reset } = this.props;

    const name = data.user ? data.user.name : 'name';

    return (
      <div className="assign-carousel-content">
        <div className="task-card">
          <div className="task-text-container">
            <h4 className="task-card-text">{topic}</h4>
            <h4 className="task-card-text">{name}</h4>
            <h4 className="task-card-text">{`${dueDate.getMonth() +
              1} ${dueDate.getDate()} ${dueDate.getFullYear()}`}</h4>
          </div>
          <div className="task-button-container">
            <button onClick={() => reset()} className="remove-button">
              <i className="fas fa-times" />
            </button>
            <button
              onClick={() => this.submitAssignment()}
              className="submit-button"
            >
              <i className="fas fa-check" />
            </button>
          </div>
        </div>

        {status && (
          <Fragment>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 130.2 130.2"
            >
              <circle
                className="path circle"
                fill="none"
                stroke="#56876D"
                strokeWidth="6"
                strokeMiterlimit="10"
                cx="65.1"
                cy="65.1"
                r="62.1"
              />
              <polyline
                className="path check"
                fill="none"
                stroke="#56876D"
                strokeWidth="6"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="100.2,40.2 51.5,88.8 29.8,67.5 "
              />
            </svg>
            <p className="success">All Done</p>
          </Fragment>
        )}
      </div>
    );
  }
}

// <div> Something went wrong! </div>

export default APIFeedback;
