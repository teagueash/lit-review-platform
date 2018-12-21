import { userConstants } from '../constants';
import auth from '../modules/auth';

const user = JSON.parse(auth.getUser());
let userObj = user ? { loggedIn: true, user } : {};

let initialState = {
  errors: {
    email: '',
    password: ''
  },
  loggingIn: false,
  loggedIn: false,
  redirect: auth.isAuthenticated(),
  user: userObj
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        redirect: false,
        user: action.user
      };

    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        redirect: true,
        user: action.user
      };

    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        redirect: false,
        errors: action.errors
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        autoLoggedIn: false,
        redirect: false
      };
    case userConstants.CLEAR_ERRORS:
      return {
        ...state,
        redirect: false,
        errors: {
          email: '',
          password: ''
        }
      };

    default:
      return state;
  }
};
