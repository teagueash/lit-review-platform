import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { taskAPI } from '../API/index';
import Button from '../components/Button';

class DownloadButton extends Component {
  downloadReview = async e => {
    const { data } = this.props;
    // prevent event bubbling up to DOM
    e.stopPropagation();

    const res = await taskAPI.downloadReview(data);

    if (res.status !== 200) {
      console.log('an error occurred, review unable to be downloaded');
    }
  };

  render() {
    const { className } = this.props;

    return <Button callback={this.downloadReview} className={className} />;
  }
}

export default DownloadButton;
