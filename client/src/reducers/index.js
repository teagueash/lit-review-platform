import { combineReducers } from 'redux';

import { authentication } from './authReducer';
import { registration } from './regReducer';
import { toast } from './toastReducer';
import { dash } from './dashReducer';
import { verify } from './verifyReducer';

export default combineReducers({
  authentication,
  registration,
  toast,
  dash,
  verify
});
