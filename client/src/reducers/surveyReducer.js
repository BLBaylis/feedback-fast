import { FETCH_SURVEYS } from '../actions/constants';

export default (initialState = [], { type, payload }) => {
  console.log('surveysReducer', type, payload);
  return type === FETCH_SURVEYS ? payload : initialState;
};
