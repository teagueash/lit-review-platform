import { toastConstants } from '../constants';
import { toastService } from '../services';

const addToast = (options = {}) => ({
  payload: toastService.createToast(options),
  type: toastConstants.ADD_TOAST
});

const removeToast = id => ({
  payload: id,
  type: toastConstants.REMOVE_TOAST
});

export const toastActions = {
  addToast,
  removeToast
};
