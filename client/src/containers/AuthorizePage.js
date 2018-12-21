import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAPI } from '../API';
import { userActions } from '../actions';
import AuthorizeForm from '../components/authComponents/AuthorizeForm';
import SignupPage from './SignupPage';

class AuthorizePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentID: ''
    };
  }

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
    console.log('Authorize Component Page');
    console.log(this);
    return (
      <div>
        {verified === false ? (
          <AuthorizeForm
            onSubmit={this.submitAuthRequest}
            onChange={this.handleChange}
            value={studentID}
            errors={errors}
          />
        ) : (
          <div>
            <SignupPage />
          </div>
        )}
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
