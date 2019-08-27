import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/constants';

export default (initialState = [], { type, payload }) => {
  if (type === FETCH_SURVEYS) {
    return payload;
  }
  if (type === DELETE_SURVEY) {
    return initialState.filter(({ _id }) => _id !== payload);
  }
  return initialState;
};
