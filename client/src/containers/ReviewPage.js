import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userActions } from '../actions/index';
import { taskAPI } from '../API/index';
import auth from '../modules/auth';
import Review from '../components/dashComponents/Review';

class ReviewPage extends Component {
  state = {
    isAdmin: false
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

  render() {
    const { review } = this.props;
    const { isAdmin } = this.state;

    return (
      <Review
        review={review}
        uploadReview={this.uploadReview}
        isAdmin={isAdmin}
      />
    );
  }
}

const mapStateToProps = state => {
  const { review } = state.review;

  return { review };
};

export default connect(mapStateToProps)(ReviewPage);
