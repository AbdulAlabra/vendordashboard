import { combineReducers } from 'redux';
import { authReducer } from './user-login-reducer';
import { languageChangeReducer } from './language-change-reducer';

const allReducers = combineReducers({
  auth: authReducer,
  language: languageChangeReducer
  //signedIn:
});

export default allReducers;
