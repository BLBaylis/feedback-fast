import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching } from '../reducers';
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_SURVEYS_REQUEST,
  FETCH_SURVEYS_SUCCESS,
  FETCH_SURVEYS_FAILURE,
  CREATE_SURVEY,
  FETCH_TOKEN,
  DELETE_SURVEY,
  REGISTER_REQUEST,
  REGISTER_COMPLETE,
  LOGIN_REQUEST,
  LOGIN_COMPLETE,
  FETCH_RECIPIENTS_REQUEST,
  FETCH_RECIPIENTS_SUCCESS,
  FETCH_RECIPIENTS_FAILURE
} from './constants';

const makeApiFetchRequest = async endpoint => {
  const res = await fetch(endpoint);
  if (!res.ok) {
    const { status, statusText } = res;
    const error = new Error('Network Problem');
    Object.assign(error, {
      status,
      statusText
    });
    throw error;
  }
  return await res.json();
};

export const fetchUser = () => async (dispatch, getState) => {
  if (getIsFetching(getState(), 'user')) {
    return Promise.resolve;
  }
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const userProfile = await makeApiFetchRequest('/api/user-info');
    dispatch({ type: FETCH_USER_SUCCESS, payload: userProfile });
  } catch (err) {
    dispatch({ type: FETCH_USER_FAILURE, payload: err });
  }
};

export const handleRegister = (values, history) => async (
  dispatch,
  getState
) => {
  if (getIsFetching(getState(), 'user')) {
    return Promise.resolve;
  }
  dispatch({ type: REGISTER_REQUEST });
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
    dispatch({ type: REGISTER_COMPLETE, payload: userProfile });
    history.push('/dashboard/surveys');
  } catch (err) {
    console.log(err);
  }
};

export const handleLogin = (credentials, history) => async (
  dispatch,
  getState
) => {
  const { email, password } = credentials;
  if (getIsFetching(getState(), 'user')) {
    return Promise.resolve;
  }
  dispatch({ type: LOGIN_REQUEST });
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
    dispatch({ type: LOGIN_COMPLETE, payload: userProfile });
    history.push('/dashboard/surveys');
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
    dispatch({ type: FETCH_TOKEN, payload: userProfile });
  } catch (err) {
    console.error(err);
  }
};

export const fetchSurveys = () => async (dispatch, getState) => {
  if (getIsFetching(getState(), 'surveys')) {
    return Promise.resolve;
  }
  dispatch({ type: FETCH_SURVEYS_REQUEST });
  try {
    const surveysRes = await makeApiFetchRequest('/api/surveys');
    const surveys = surveysRes.map(curr => {
      const { _id: id, _id, ...rest } = curr;
      return { id, ...rest };
    });
    const normalisedSurveys = normalize(surveys, schema.surveyListSchema);
    dispatch({ type: FETCH_SURVEYS_SUCCESS, payload: normalisedSurveys });
  } catch (err) {
    dispatch({
      type: FETCH_SURVEYS_FAILURE,
      payload: err
    });
  }
};

export const createSurvey = (values, history) => async dispatch => {
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
    dispatch({ type: CREATE_SURVEY, payload: userProfile });
    history.push('/dashboard/surveys');
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

export const fetchRecipients = surveyId => async (dispatch, getState) => {
  if (getIsFetching(getState(), 'recipients')) {
    return Promise.resolve;
  }
  try {
    dispatch({ type: FETCH_RECIPIENTS_REQUEST });
    const recipientsRes = await makeApiFetchRequest(
      `/api/recipients/${surveyId}`
    );
    const recipients = recipientsRes.map(curr => {
      const { _id: id, _id, ...rest } = curr;
      return { id, ...rest };
    });
    const normalisedRecipients = normalize(
      recipients,
      schema.recipientListSchema
    );
    dispatch({ type: FETCH_RECIPIENTS_SUCCESS, payload: normalisedRecipients });
  } catch (err) {
    dispatch({ type: FETCH_RECIPIENTS_FAILURE, payload: err });
  }
};
