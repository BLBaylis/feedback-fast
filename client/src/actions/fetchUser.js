import { FETCH_USER } from './constants';

const fetchUser = () => {
  return async dispatch => {
    const res = await fetch('/api/user-info');
    const userProfile = await res.json();
    console.log(userProfile);
    dispatch({ type: FETCH_USER, payload: userProfile });
  };
};

export default fetchUser;
