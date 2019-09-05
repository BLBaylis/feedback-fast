import { combineReducers } from 'redux';
import {
  FETCH_SURVEYS_REQUEST,
  FETCH_SURVEYS_SUCCESS,
  FETCH_SURVEYS_FAILURE,
  DELETE_SURVEY
} from '../actions/constants';

const error = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_SURVEYS_FAILURE:
      return payload;
    case FETCH_SURVEYS_SUCCESS:
    case FETCH_SURVEYS_REQUEST:
    default:
      return state;
  }
};

const byId = (state = {}, { type, payload }) => {
  if (type === FETCH_SURVEYS_SUCCESS) {
    return payload.entities.surveys;
  }
  if (type === DELETE_SURVEY) {
    return state.filter(({ _id }) => _id !== payload);
  }
  return state;
};

const allIds = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_SURVEYS_SUCCESS:
      return payload.result;
    case DELETE_SURVEY:
      return state.filter(({ _id }) => _id !== payload);
    default:
      return state;
  }
};

const isFetching = (state = false, { type }) => {
  switch (type) {
    case FETCH_SURVEYS_REQUEST:
      return true;
    case FETCH_SURVEYS_SUCCESS:
    case FETCH_SURVEYS_FAILURE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds,
  isFetching,
  error
});

export const getSurveys = state => state.allIds.map(id => state.byId[id]);
export const getSurveyById = (state, id) => state.byId[id];
export const getError = state => state.error;
export const getIsFetching = state => state.isFetching;
