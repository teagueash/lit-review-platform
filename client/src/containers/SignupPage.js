import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { userActions } from '../actions';
import { toastActions } from '../actions';
import SignupForm from '../components/authComponents/SignupForm';
import Toasts from '../components/Toasts';
import auth from '../modules/auth';

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        email: '',
        password: ''
      }
    };
  }

  // remove toaster notifications on component unmount
  componentWillUnmount() {}

  // clear any residual errors from previous attempts
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(userActions.clearErrors());
  }

  changeUser = event => {
    const { name, value } = event.target;
    const { user } = this.state;

    user[name] = value;
    this.setState({ user });
  };

  processForm = async event => {
    event.preventDefault();
    const { name, email, password } = this.state.user;
    const { dispatch } = this.props;

    const token = auth.getVerifiedUserToken();

    dispatch(userActions.register(name, email, password, token));
    // dispatch(
    //   toastActions.addToast({
    //     text: 'Uh oh, looks like something went wrong'
    //   })
    // );
  };

  render() {
    const { user } = this.state;
    const { registering, errors, redirect } = this.props;

    return (
      <div>
        {redirect === false ? (
          <SignupForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={errors}
            user={user}
            toast={<Toasts />}
          />
        ) : (
          <div>
            <Redirect to="/login" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { registering, errors, redirect } = state.registration;
  return {
    registering,
    errors,
    redirect
  };
};

export default connect(mapStateToProps)(SignupPage);
