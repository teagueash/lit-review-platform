import { toastConstants } from '../constants';

export const toast = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case toastConstants.ADD_TOAST:
      return [payload, ...state];
    case toastConstants.REMOVE_TOAST:
      return state.filter(toast => toast.id !== payload);
    default:
      return state;
  }
};
