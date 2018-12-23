import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userActions } from '../actions/index';
import { taskAPI } from '../API/index';
import auth from '../modules/auth';
import ViewReview from '../components/dashComponents/ViewReview';

class ViewReviewContainer extends Component {
  state = {
    isAdmin: false,
    prevPath: null
  };
  // check cache for review (in case of refresh)
  componentDidMount() {
    const { review } = this.props;
    // role used to determine what additional elements user gets to see
    const { role } = JSON.parse(auth.getUser());
    const isAdmin = role === 'admin';

    this.setState({ isAdmin });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(userActions.clearReview());
  }

  uploadReview = async (file, review) => {
    const data = new FormData();
    data.append('file', file[0]);
    data.append('filename', file[0].name);
    data.append('reviewDetails', JSON.stringify(review));
    data.append('encoding', 'multipart/form-data');

    const res = await taskAPI.submitTask(data);
    if (res.status === 200) {
      console.log('file successfully uploaded!');
    } else {
      console.log('an error occurred, the file was not uploaded');
    }
  };

  // delete review and update state to reflect previous path
  deleteReview = async () => {
    const { _id } = this.props.review;
    const res = await taskAPI.deleteTask(_id);

    if (res.status === 200) {
      this.setPrevPath();
    } else {
      console.log('an error occurred, review was not deleted');
    }
  };

  // generate relative path redirect URL
  setPrevPath = () => {
    const { pathname } = this.props.location;
    const prevPath = pathname.substring(0, pathname.lastIndexOf('/'));

    this.setState({ prevPath });
  };

  render() {
    const { review, location } = this.props;
    const { isAdmin, prevPath } = this.state;

    return (
      <div>
        {prevPath && <Redirect to={`${prevPath}`} />}
        <ViewReview
          review={review}
          uploadReview={this.uploadReview}
          deleteReview={this.deleteReview}
          setPrevPath={this.setPrevPath}
          isAdmin={isAdmin}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { review } = state.review;

  return { review };
};

export default connect(mapStateToProps)(ViewReviewContainer);
