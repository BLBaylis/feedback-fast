import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_TOKEN,
  REGISTER_REQUEST,
  REGISTER_COMPLETE,
  LOGIN_REQUEST,
  LOGIN_COMPLETE,
  CREATE_SURVEY
} from '../actions/constants';
import { combineReducers } from 'redux';

const error = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_USER_FAILURE:
      return payload;
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case FETCH_USER_REQUEST:
    case FETCH_USER_SUCCESS:
    case REGISTER_COMPLETE:
    case LOGIN_COMPLETE:
    default:
      return state;
  }
};

const user = (state = null, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
    case REGISTER_COMPLETE:
    case LOGIN_REQUEST:
    case LOGIN_COMPLETE:
    case FETCH_USER_SUCCESS:
    case FETCH_TOKEN:
    case CREATE_SURVEY:
      return payload || state;
    default:
      return state;
  }
};

const isFetching = (state = false, { type }) => {
  switch (type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case FETCH_USER_REQUEST:
      return true;
    case FETCH_USER_SUCCESS:
    case FETCH_USER_FAILURE:
    case REGISTER_COMPLETE:
    case LOGIN_COMPLETE:
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
