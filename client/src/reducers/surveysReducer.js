import { combineReducers } from 'redux';
import {
  FETCH_SURVEYS_REQUEST,
  FETCH_SURVEYS_SUCCESS,
  FETCH_SURVEYS_FAILURE,
  CREATE_SURVEY_REQUEST,
  CREATE_SURVEY_SUCCESS,
  CREATE_SURVEY_FAILURE,
  DELETE_SURVEY_REQUEST,
  DELETE_SURVEY_SUCCESS,
  DELETE_SURVEY_FAILURE
} from '../actions/constants';

const error = (state = {}, { type, err }) => {
  switch (type) {
    case FETCH_SURVEYS_FAILURE:
    case CREATE_SURVEY_FAILURE:
    case DELETE_SURVEY_FAILURE:
      return err;
    case FETCH_SURVEYS_REQUEST:
    case CREATE_SURVEY_REQUEST:
    case FETCH_SURVEYS_SUCCESS:
    case CREATE_SURVEY_SUCCESS:
    case DELETE_SURVEY_REQUEST:
    case DELETE_SURVEY_SUCCESS:
      return {};
    default:
      return state;
  }
};

const byId = (state = {}, { type, surveys }) => {
  if (type === DELETE_SURVEY_SUCCESS) {
    const { [surveys.result]: deletedId, ...remainingSurveys } = state;
    return { ...remainingSurveys };
  }
  if (surveys) {
    return {
      ...state,
      ...surveys.entities.surveys
    };
  }
  return state;
};

const allIds = (state = [], { type, surveys }) => {
  switch (type) {
    case FETCH_SURVEYS_SUCCESS:
      return surveys.result;
    case CREATE_SURVEY_SUCCESS:
      return [...state, surveys.result];
    case DELETE_SURVEY_SUCCESS:
      return state.filter(id => id !== surveys.result);
    default:
      return state;
  }
};

const isFetching = (state = false, { type }) => {
  switch (type) {
    case FETCH_SURVEYS_REQUEST:
    case CREATE_SURVEY_REQUEST:
    case DELETE_SURVEY_REQUEST:
      return true;
    case FETCH_SURVEYS_SUCCESS:
    case FETCH_SURVEYS_FAILURE:
    case CREATE_SURVEY_SUCCESS:
    case CREATE_SURVEY_FAILURE:
    case DELETE_SURVEY_SUCCESS:
    case DELETE_SURVEY_FAILURE:
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
