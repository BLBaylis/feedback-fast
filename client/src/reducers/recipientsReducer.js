import { FETCH_RECIPIENTS } from '../actions/constants';

export default (initialState = [], { type, payload }) => {
  return type === FETCH_RECIPIENTS ? payload : initialState;
};
