import { combineReducers } from 'redux';
import {
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE
} from '../actions/constants';

const error = (state = {}, { type, err }) => {
  switch (type) {
    case VERIFY_TOKEN_FAILURE:
      return err;
    case VERIFY_TOKEN_REQUEST:
    case VERIFY_TOKEN_SUCCESS:
      return {};
    default:
      return state;
  }
};

const isFetching = (state = false, { type }) => {
  switch (type) {
    case VERIFY_TOKEN_REQUEST:
      return true;
    case VERIFY_TOKEN_FAILURE:
    case VERIFY_TOKEN_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  error
});

export const getError = state => state.error;
export const getIsFetching = state => state.isFetching;
