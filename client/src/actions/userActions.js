import { userConstants } from '../constants';
import { userService } from '../services';

const autoLogin = token => {
  const success = user => ({ type: userConstants.LOGIN_SUCCESS, user });
  const failure = errors => ({ type: userConstants.LOGIN_FAILURE, errors });

  return async dispatch => {
    const res = await userService.autoLogin(token);

    if (res.status === 200 && res.data.token) {
      dispatch(success(res.data.user));
    } else {
      const { errors } = res.data;
      // // test whether no errors returned, if so set to empty object
      errors === undefined ? dispatch(failure({})) : dispatch(failure(errors));
    }
  };
};

const login = (email, password) => {
  const request = user => ({ type: userConstants.LOGIN_REQUEST, user });
  const success = user => ({ type: userConstants.LOGIN_SUCCESS, user });
  const failure = errors => ({ type: userConstants.LOGIN_FAILURE, errors });

  return async dispatch => {
    dispatch(request({ email }));

    const res = await userService.login(email, password);

    // need to determine if valid user or error
    if (res.success) {
      const { user } = res;
      // user object returned
      dispatch(success(user));
    } else {
      // server-anticipated errors occurred
      const { errors } = res;

      // test whether no errors returned, if so set to empty object
      errors === undefined ? dispatch(failure({})) : dispatch(failure(errors));
    }
  };
};

const register = (name, email, password) => {
  const request = user => ({ type: userConstants.REGISTER_REQUEST, user });
  const success = user => ({ type: userConstants.REGISTER_SUCCESS, user });
  const failure = errors => ({
    type: userConstants.REGISTER_FAILURE,
    errors
  });

  return async dispatch => {
    dispatch(request({ email }));

    const res = await userService.register(name, email, password);

    // need to determine if valid user or error
    if (res.status === 200) {
      const { user } = res.data;
      // successful sign up
      dispatch(success(user));
    } else {
      // errors occurred
      const { errors } = res;
      // test whether no errors returned, if so set to empty object
      errors === undefined ? dispatch(failure({})) : dispatch(failure(errors));
    }
  };
};

const logout = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
};

const verify = studentID => {
  const request = () => ({ type: userConstants.VERIFY_REQUEST });
  const success = () => ({ type: userConstants.VERIFY_SUCCESS });
  const failure = errors => ({
    type: userConstants.VERIFY_FAILURE,
    errors
  });

  return async dispatch => {
    dispatch(request());

    const res = await userService.verify(studentID);

    // need to determine if valid user or error
    if (res.status === 200) {
      // successful sign up
      dispatch(success());
    } else {
      // errors occurred
      const { errors } = res;
      // test whether no errors returned, if so set to empty object
      errors === undefined ? dispatch(failure({})) : dispatch(failure(errors));
    }
  };
};

const clearErrors = () => {
  return { type: userConstants.CLEAR_ERRORS, errors: {} };
};

export const userActions = {
  autoLogin,
  login,
  register,
  logout,
  verify,
  clearErrors
};
