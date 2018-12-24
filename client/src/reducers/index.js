import { combineReducers } from 'redux';

import { authentication } from './authReducer';
import { registration } from './regReducer';
import { toast } from './toastReducer';
import { verify } from './verifyReducer';
import { review } from './reviewReducer';
import { path } from './pathReducer';

export default combineReducers({
  authentication,
  registration,
  toast,
  verify,
  review,
  path
});
