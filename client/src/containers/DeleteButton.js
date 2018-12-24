import React, { Component, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { taskAPI } from '../API/index';
import Button from '../components/Button';

class DeleteButton extends Component {
  state = {
    prevPath: null
  };

  // delete review and update state to reflect previous path or refresh
  deleteReview = async e => {
    const { data } = this.props;
    // prevent event bubbling up to DOM
    e.stopPropagation();

    const res = await taskAPI.deleteTask(data);

    if (res.status === 200) {
      this.setPrevPath();
    } else {
      console.log('an error occurred, review was not deleted');
    }
  };

  // generate most recent path for redirect
  setPrevPath = () => {
    const { pathname } = this.props.location;

    // test path to determine if review container reload or redirect is required
    const length = pathname.split('/').length;
    if (length === 3) {
      // was passed setRemove
      const { setRemove } = this.props;
      setRemove();
    } else {
      const prevPath = pathname.substring(0, pathname.lastIndexOf('/'));
      this.setState({ prevPath });
    }
  };

  render() {
    const { prevPath } = this.state;
    const { className } = this.props;

    return (
      <Fragment>
        {prevPath && <Redirect to={`${prevPath}`} />}
        <Button callback={this.deleteReview} className={className} />
      </Fragment>
    );
  }
}

export default withRouter(DeleteButton);
