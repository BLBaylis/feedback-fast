import { FETCH_USER } from './constants';

export const fetchUser = () => async dispatch => {
  try {
    const res = await fetch('/api/user-info');
    var userProfile = await res.json();
  } catch (err) {
    dispatch({ type: FETCH_USER, payload: false });
  }
  dispatch({ type: FETCH_USER, payload: userProfile });
};
