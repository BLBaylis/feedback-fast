import { combineReducers } from 'redux';
import {
  FETCH_RECIPIENTS_REQUEST,
  FETCH_RECIPIENTS_SUCCESS,
  FETCH_RECIPIENTS_FAILURE
} from '../actions/constants';

const error = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_RECIPIENTS_FAILURE:
      return payload;
    case FETCH_RECIPIENTS_SUCCESS:
    case FETCH_RECIPIENTS_REQUEST:
    default:
      return state;
  }
};

export const byId = (state = {}, action) => {
  switch (action.type) {
    case FETCH_RECIPIENTS_SUCCESS:
      return action.payload.entities.recipients;
    default:
      return state;
  }
};

export const allIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_RECIPIENTS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_RECIPIENTS_REQUEST:
      return true;
    case FETCH_RECIPIENTS_SUCCESS:
    case FETCH_RECIPIENTS_FAILURE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  error,
  byId,
  allIds,
  isFetching
});

export const getRecipients = state => state.allIds.map(id => state.byId[id]);
export const getError = state => state.error;
export const getIsFetching = state => state.isFetching;
