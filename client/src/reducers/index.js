import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import recipientsReducer from './recipientsReducer';

export default combineReducers({
  auth: authReducer,
  surveys: surveyReducer,
  recipients: recipientsReducer
});
