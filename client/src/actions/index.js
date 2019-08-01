import { FETCH_USER, HANDLE_TOKEN } from './constants';

export const fetchUser = () => async dispatch => {
  try {
    const res = await fetch('/api/user-info');
    var userProfile = await res.json();
  } catch (err) {
    dispatch({ type: FETCH_USER, payload: false });
  }
  dispatch({ type: FETCH_USER, payload: userProfile });
};

export const handleToken = token => async dispatch => {
  try {
    const res = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token)
    });
    const user = await res.json();
    if (user.error) {
      throw new Error();
    }
    dispatch({ type: HANDLE_TOKEN, payload: user });
  } catch (err) {
    console.error(err);
  }
};
