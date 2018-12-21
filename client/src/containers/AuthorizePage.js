import React, { Component } from 'react';
import AuthorizeForm from '../components/authComponents/AuthorizeForm';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { userActions } from '../actions';

class AuthorizePage extends Component {
  state = {
    studentID: ''
  };

  submitAuthRequest = async () => {
    const { dispatch } = this.props;
    const { studentID } = this.state;

    dispatch(userActions.verify(studentID));
  };

  setStudentID = studentID => {
    this.setState({ studentID });
  };

  handleChange = e => {
    e.preventDefault();
    // validate form, if empty do not set topic
    this.setStudentID(e.target.value);
  };

  render() {
    const { verified, errors } = this.props;
    const { studentID } = this.state;

    return (
      <div>
        {verified && <Redirect to="/signup" />}
        <AuthorizeForm
          onSubmit={this.submitAuthRequest}
          onChange={this.handleChange}
          value={studentID}
          errors={errors}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { verifying, errors, verified } = state.verify;

  return {
    verifying,
    errors,
    verified
  };
};

export default connect(mapStateToProps)(AuthorizePage);
