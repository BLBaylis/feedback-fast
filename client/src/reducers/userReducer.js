import * as actionTypes from '../actions/constants';
import { combineReducers } from 'redux';

const error = (state = {}, { type, err }) => {
  switch (type) {
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.CREATE_SURVEY_FAILURE:
      return err;
    case actionTypes.FETCH_USER_REQUEST:
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.CREATE_SURVEY_REQUEST:
    case actionTypes.CREATE_SURVEY_SUCCESS:
      return {};
    default:
      return state;
  }
};

const user = (state = null, { user }) => (user ? user : state);

const isFetching = (state = false, { type }) => {
  switch (type) {
    case actionTypes.FETCH_USER_REQUEST:
    case actionTypes.CREATE_SURVEY_REQUEST:
      return true;
    case actionTypes.FETCH_USER_SUCCESS:
    case actionTypes.FETCH_USER_FAILURE:
    case actionTypes.CREATE_SURVEY_SUCCESS:
    case actionTypes.CREATE_SURVEY_FAILURE:
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
