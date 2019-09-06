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
  CREATE_SURVEY_REQUEST,
  CREATE_SURVEY_SUCCESS,
  CREATE_SURVEY_FAILURE,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILURE,
  FETCH_RECIPIENTS_REQUEST,
  FETCH_RECIPIENTS_SUCCESS,
  FETCH_RECIPIENTS_FAILURE,
  DELETE_SURVEY_REQUEST,
  DELETE_SURVEY_SUCCESS,
  DELETE_SURVEY_FAILURE,
  REGISTER_REQUEST,
  REGISTER_COMPLETE,
  LOGIN_REQUEST,
  LOGIN_COMPLETE
} from './constants';

const makeApiRequestWithoutBody = async (endpoint, method) => {
  const res = await fetch(endpoint, {
    method
  });
  if (!res.ok) {
    const { status, statusText } = res;
    const error = new Error('Network Problem');
    throw Object.assign(error, {
      status,
      statusText
    });
  }
  return await res.json();
};

const makeApiRequestWithBody = async (endpoint, method, body) => {
  const res = await fetch(endpoint, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
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
    return Promise.resolve();
  }
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const user = await makeApiRequestWithoutBody('/api/user-info', 'get');
    dispatch({ type: FETCH_USER_SUCCESS, user });
  } catch (err) {
    dispatch({ type: FETCH_USER_FAILURE, err });
  }
};

export const handleRegister = (values, history) => async (
  dispatch,
  getState
) => {
  if (getIsFetching(getState(), 'user')) {
    return Promise.resolve();
  }
  dispatch({ type: REGISTER_REQUEST });
  try {
    const user = await makeApiRequestWithBody('/api/register', 'post', values);
    dispatch({ type: REGISTER_COMPLETE, user });
    history.push('/dashboard/surveys');
  } catch (err) {
    console.log(err);
  }
};

export const handleLogin = (credentials, history) => async (
  dispatch,
  getState
) => {
  if (getIsFetching(getState(), 'user')) {
    return Promise.resolve();
  }
  dispatch({ type: LOGIN_REQUEST });
  try {
    const user = await makeApiRequestWithBody(
      '/api/login',
      'post',
      credentials
    );
    dispatch({ type: LOGIN_COMPLETE, user });
    history.push('/dashboard/surveys');
  } catch (err) {
    console.error(err);
  }
};

export const handleToken = token => async dispatch => {
  dispatch({ type: VERIFY_TOKEN_REQUEST });
  try {
    //token = { id: 'tok_chargeDeclinedInsufficientFunds' };
    const res = await fetch('/api/stripe', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(token)
    });
    if (!res.ok) {
      throw await res.json();
    }
    const user = await res.json();
    dispatch({ type: VERIFY_TOKEN_SUCCESS, user });
  } catch (err) {
    dispatch({ type: VERIFY_TOKEN_FAILURE, err });
  }
};

export const fetchSurveys = () => async (dispatch, getState) => {
  if (getIsFetching(getState(), 'surveys')) {
    return Promise.resolve();
  }
  dispatch({ type: FETCH_SURVEYS_REQUEST });
  try {
    const surveysRes = await makeApiRequestWithoutBody('/api/surveys', 'get');
    const surveys = surveysRes.map(curr => {
      const { _id: id, _id, ...rest } = curr;
      return { id, ...rest };
    });
    const normalisedSurveys = normalize(surveys, schema.surveyListSchema);
    dispatch({ type: FETCH_SURVEYS_SUCCESS, surveys: normalisedSurveys });
  } catch (err) {
    dispatch({
      type: FETCH_SURVEYS_FAILURE,
      err
    });
  }
};

export const createSurvey = (values, history) => async dispatch => {
  dispatch({ type: CREATE_SURVEY_REQUEST });
  try {
    const res = await makeApiRequestWithBody('/api/surveys', 'post', values);
    const { user, survey } = res;
    const { _id: id, ...rest } = survey;
    const newSurvey = { id, ...rest };
    const normalisedSurvey = normalize(newSurvey, schema.surveySchema);
    dispatch({
      type: CREATE_SURVEY_SUCCESS,
      user,
      surveys: normalisedSurvey
    });
    history.push('/dashboard/surveys');
  } catch (err) {
    dispatch({ type: CREATE_SURVEY_FAILURE, err });
  }
};

export const deleteSurvey = surveyId => async dispatch => {
  dispatch({ type: DELETE_SURVEY_REQUEST });
  try {
    const res = await fetch(`/api/surveys/${surveyId}`, {
      method: 'delete'
    });
    if (!res.ok) {
      const { status, statusText } = res;
      const error = new Error('Network Problem');
      Object.assign(error, {
        status,
        statusText
      });
      throw error;
    }
    dispatch({ type: DELETE_SURVEY_SUCCESS, surveys: { result: surveyId } });
  } catch (err) {
    dispatch({ type: DELETE_SURVEY_FAILURE, err });
  }
};

export const fetchRecipients = surveyId => async (dispatch, getState) => {
  if (getIsFetching(getState(), 'recipients')) {
    return Promise.resolve();
  }
  dispatch({ type: FETCH_RECIPIENTS_REQUEST });
  try {
    const recipientsRes = await makeApiRequestWithoutBody(
      `/api/recipients/${surveyId}`,
      'get'
    );
    const recipients = recipientsRes.map(curr => {
      const { _id: id, _id, ...rest } = curr;
      return { id, ...rest };
    });
    const normalisedRecipients = normalize(
      recipients,
      schema.recipientListSchema
    );
    dispatch({
      type: FETCH_RECIPIENTS_SUCCESS,
      recipients: normalisedRecipients
    });
  } catch (err) {
    dispatch({ type: FETCH_RECIPIENTS_FAILURE, err });
  }
};
