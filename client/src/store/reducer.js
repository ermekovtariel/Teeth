import { combineReducers } from 'redux';

import auth from './Auth/reducer';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
