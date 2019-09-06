import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_COMPLETE,
  LOGIN_REQUEST,
  LOGIN_COMPLETE,
  CREATE_SURVEY_REQUEST,
  CREATE_SURVEY_SUCCESS,
  CREATE_SURVEY_FAILURE
} from '../actions/constants';
import { combineReducers } from 'redux';

const error = (state = {}, { type, err }) => {
  switch (type) {
    case FETCH_USER_FAILURE:
    case CREATE_SURVEY_FAILURE:
      return err;
    case FETCH_USER_REQUEST:
    case FETCH_USER_SUCCESS:
    case CREATE_SURVEY_REQUEST:
    case CREATE_SURVEY_SUCCESS:
      return {};
    default:
      return state;
  }
};

const user = (state = null, { user }) => (user ? user : state);

const isFetching = (state = false, { type }) => {
  switch (type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case FETCH_USER_REQUEST:
    case CREATE_SURVEY_REQUEST:
      return true;
    case FETCH_USER_SUCCESS:
    case FETCH_USER_FAILURE:
    case REGISTER_COMPLETE:
    case LOGIN_COMPLETE:
    case CREATE_SURVEY_SUCCESS:
    case CREATE_SURVEY_FAILURE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  error,
  user,
  isFetching
});

export const getUser = state => state.user;
export const getError = state => state.error;
export const getIsFetching = state => state.isFetching;
