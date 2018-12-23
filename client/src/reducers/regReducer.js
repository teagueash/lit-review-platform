import { userConstants } from '../constants';

let initialState = {
  errors: {},
  registering: false,
  registered: false,
  redirect: false
};

export const registration = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        registering: true
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        registered: true,
        redirect: true
      };
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        errors: action.errors
      };
    case userConstants.CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
        redirect: false
      };
    default:
      return state;
  }
};
