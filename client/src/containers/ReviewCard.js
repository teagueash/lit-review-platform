import React, { Component, Fragment } from 'react';
import { Spring } from 'react-spring';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { userActions } from '../actions/index';
import auth from '../modules/auth';
import ReviewElement from '../components/dashComponents/ReviewElement';

class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      auth: '',
      remove: null
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

  setReview = () => {
    const { dispatch, content } = this.props;

    dispatch(userActions.setReview(content));
  };

  setRemove = () => {
    this.setState({ remove: true });
  };

  // generate relative path redirect URL
  getURL = () => {
    const { pathname } = this.props.location;
    const relativePath = pathname.split('/')[2];

    return relativePath;
  };

  // evaluate redirect flag (if <Review /> is clicked) then whether
  render() {
    const { content, redirect } = this.props;
    const { isHovering, auth, remove } = this.state;

    const path = this.getURL();

    return (
      <Fragment>
        {redirect && <Redirect to={`/user/${path}/review`} />}
        {remove ? null : (
          <ReviewElement
            setReview={this.setReview}
            setRemove={this.setRemove}
            auth={auth}
            content={content}
            onChange={this.onChange}
            isHovering={true}
          />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => state.review;

export default withRouter(connect(mapStateToProps)(ReviewCard));
