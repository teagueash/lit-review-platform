import { userConstants } from '../constants';

let initialState = {
  errors: {},
  verifying: false,
  verified: false
};

/*****************************************
 *                                       *
 *   TODO: refactor to include payload,  *
 *   not hardcoded state values          *
 *                                       *
 *****************************************/
export const verify = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case userConstants.VERIFY_REQUEST:
      return {
        ...state,
        verifying: true
      };
    case userConstants.VERIFY_SUCCESS:
      return {
        ...state,
        verified: true
      };
    case userConstants.VERIFY_FAILURE:
      return {
        ...state,
        errors: action.errors
      };
    case userConstants.CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      };
    default:
      return state;
  }
};
