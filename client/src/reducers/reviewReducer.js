import { userConstants } from '../constants';

export const review = (state = { review: {}, redirect: false }, action) => {
  const { type, review } = action;

  switch (type) {
    case userConstants.SET_REVIEW:
      return { ...state, review, redirect: true };
    case userConstants.CLEAR_REVIEW:
      return { ...state, review, redirect: false };
    default:
      return state;
  }
};
