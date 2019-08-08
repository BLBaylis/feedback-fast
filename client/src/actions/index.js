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
    const userProfile = await res.json();
    if (userProfile.error) {
      throw new Error();
    }
    dispatch({ type: FETCH_USER, payload: userProfile });
  } catch (err) {
    console.error(err);
  }
};

export const submitSurvey = (values, history) => async dispatch => {
  try {
    const res = await fetch('/api/surveys', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const userProfile = await res.json();
    if (userProfile.error) {
      throw new Error();
    }
    history.push('/dashboard');
    dispatch({ type: FETCH_USER, payload: userProfile });
  } catch (err) {
    console.error(err);
  }
};
