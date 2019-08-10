import { FETCH_USER } from '../actions/constants';

export default (initialState = null, action) => {
  console.log(
    `initialState : ${initialState}, there was an action : ${action.type}`
  );
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return initialState;
  }
};
