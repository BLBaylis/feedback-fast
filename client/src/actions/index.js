import {
  FETCH_USER,
  FETCH_SURVEYS,
  FETCH_RECIPIENTS,
  DELETE_SURVEY
} from './constants';

export const fetchUser = () => async dispatch => {
  try {
    const res = await fetch('/api/user-info');
    var userProfile = await res.json();
  } catch (err) {
    dispatch({ type: FETCH_USER, payload: false });
  }
  dispatch({ type: FETCH_USER, payload: userProfile });
};

export const handleRegister = (values, history) => async dispatch => {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const userProfile = await res.json();
    console.log(userProfile);
    if (userProfile.error) {
      throw new Error();
    }
    history.push('/dashboard/surveys');
    dispatch({ type: FETCH_USER, payload: userProfile });
  } catch (err) {
    console.log(err);
  }
};

export const handleLogin = (credentials, history) => async dispatch => {
  const { email, password } = credentials;
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const userProfile = await res.json();
    if (userProfile.error) {
      throw new Error();
    }
    history.push('/dashboard/surveys');
    dispatch({ type: FETCH_USER, payload: userProfile });
  } catch (err) {
    console.error(err);
  }
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

    dispatch({ type: FETCH_USER, payload: userProfile });
    history.push('/dashboard/surveys');
  } catch (err) {
    console.error(err);
  }
};

export const fetchSurveys = () => async dispatch => {
  try {
    const res = await fetch('/api/surveys');
    var surveys = await res.json();
    if (surveys.error) {
      throw new Error(surveys.error);
    }
    dispatch({ type: FETCH_SURVEYS, payload: surveys });
  } catch (err) {
    console.log(err);
  }
};

export const fetchRecipients = surveyId => async dispatch => {
  try {
    const res = await fetch(`/api/recipients/${surveyId}`);
    const recipients = await res.json();
    dispatch({ type: FETCH_RECIPIENTS, payload: recipients });
  } catch (err) {
    console.error(err);
  }
};

export const deleteSurvey = surveyId => async dispatch => {
  try {
    const res = await fetch(`/api/surveys/${surveyId}`, {
      method: 'DELETE'
    });
    if (!res.status === 204) {
      throw new Error("Response for deleteSurvey request wasn't 204");
    }
    dispatch({ type: DELETE_SURVEY, payload: surveyId });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
