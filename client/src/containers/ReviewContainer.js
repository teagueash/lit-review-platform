import React, { Component } from 'react';
import { Spring } from 'react-spring';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { taskAPI } from '../API';
import { userActions } from '../actions/index';
import auth from '../modules/auth';
import Review from '../components/dashComponents/Review';

class ReviewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      auth: ''
    };
  }

  componentDidMount() {
    const { role } = JSON.parse(auth.getUser());
    this.setState({ auth: role });
  }

  onChange = () => {
    const { isHovering } = this.state;
    this.setState({ isHovering: !isHovering });
  };

  downloadReview = async data => {
    const res = await taskAPI.downloadReview(data);

    if (res.status !== 200) {
      console.log('an error occurred, review unable to be downloaded');
    }
  };

  // migrate to redux boilerplate
  setReview = () => {
    const { dispatch, content } = this.props;

    dispatch(userActions.setReview(content));
  };

  // generate relative path redirect URL
  getURL = () => {
    const { pathname } = this.props.location;
    const relativePath = pathname.split('/')[2];

    return relativePath;
  };

  render() {
    const { content, redirect } = this.props;
    const { isHovering, auth } = this.state;

    const path = this.getURL();

    return (
      <div>
        {redirect && <Redirect to={`/user/${path}/review`} />}
        <Review
          setReview={this.setReview}
          auth={auth}
          content={content}
          onChange={this.onChange}
          isHovering={isHovering}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state.review;

export default withRouter(connect(mapStateToProps)(ReviewContainer));
