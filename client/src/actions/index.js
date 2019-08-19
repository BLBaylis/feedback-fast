import { FETCH_USER, FETCH_SURVEYS, FETCH_RECIPIENTS } from './constants';

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

export const fetchSurveys = () => async dispatch => {
  try {
    const res = await fetch('/api/surveys');
    var surveys = await res.json();
  } catch (err) {
    dispatch({ type: FETCH_SURVEYS, payload: false });
  }
  dispatch({ type: FETCH_SURVEYS, payload: surveys });
};

export const fetchRecipients = surveyId => async dispatch => {
  try {
    const res = await fetch('/api/surveys/recipients', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: surveyId })
    });
    const recipients = await res.json();
    console.log(recipients, 'action');
    if (recipients.error) {
      throw new Error();
    }
    dispatch({ type: FETCH_RECIPIENTS, payload: recipients });
  } catch (err) {
    console.error(err);
  }
};
