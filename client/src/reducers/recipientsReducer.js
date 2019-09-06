import { combineReducers } from 'redux';
import {
  FETCH_RECIPIENTS_REQUEST,
  FETCH_RECIPIENTS_SUCCESS,
  FETCH_RECIPIENTS_FAILURE,
  FETCH_SURVEYS_REQUEST
} from '../actions/constants';

const error = (state = {}, { type, err }) => {
  switch (type) {
    case FETCH_RECIPIENTS_FAILURE:
      return err;
    case FETCH_SURVEYS_REQUEST:
    case FETCH_RECIPIENTS_SUCCESS:
      return {};
    default:
      return state;
  }
};

export const byId = (state = {}, { recipients }) =>
  recipients ? recipients.entities.recipients : state;

export const allIds = (state = [], { recipients }) =>
  recipients ? recipients.result : state;

const isFetching = (state = false, { type }) => {
  switch (type) {
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
