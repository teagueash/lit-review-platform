import { userConstants } from '../constants';

export const path = (state = { pathName: '' }, action) => {
  const { type, pathName } = action;

  switch (type) {
    case userConstants.UPDATE_PATH:
      return { ...state, pathName };
    default:
      return state;
  }
};
