import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { userActions } from '../actions';
import LoginForm from '../components/authComponents/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formUser: {
        email: '',
        password: ''
      }
    };
  }

  // clear any residual errors from previous attempts
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(userActions.clearErrors());
  }

  changeUser = event => {
    const { name, value } = event.target;
    const { formUser } = this.state;

    formUser[name] = value;
    this.setState({ formUser });
  };

  processForm = async event => {
    event.preventDefault();
    const { email, password } = this.state.formUser;
    const { dispatch } = this.props;

    dispatch(userActions.login(email, password));
  };

  render() {
    const { formUser } = this.state;
    const { loggingIn, redirect, errors, open, user } = this.props;

    return (
      <div>
        {redirect === false ? (
          <LoginForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={errors}
            user={formUser}
            open={open}
          />
        ) : (
          <Redirect to="/user" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggingIn, redirect, errors, user } = state.authentication;

  return {
    loggingIn,
    redirect,
    errors,
    user
  };
};

export default connect(mapStateToProps)(LoginPage);
