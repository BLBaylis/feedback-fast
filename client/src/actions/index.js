import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching } from '../reducers';
import * as actionTypes from './constants';

const makeApiRequestWithoutBody = async (endpoint, method) => {
  const res = await fetch(endpoint, {
    method
  });
  if (!res.ok) {
    const { status, statusText } = res;
    const error = new Error();
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
    const error = new Error();
    throw Object.assign(error, {
      status,
      statusText
    });
  }
  return await res.json();
};

export const fetchUser = () => async (dispatch, getState) => {
  if (getIsFetching(getState(), 'user')) {
    return Promise.resolve();
  }
  dispatch({ type: actionTypes.FETCH_USER_REQUEST });
  try {
    const user = await makeApiRequestWithoutBody('/api/user-info', 'get');
    dispatch({ type: actionTypes.FETCH_USER_SUCCESS, user });
  } catch (err) {
    dispatch({ type: actionTypes.FETCH_USER_FAILURE, err });
  }
};

export const handleRegister = (values, history) => async (
  dispatch,
  getState
) => {
  if (getIsFetching(getState(), 'user')) {
    return Promise.resolve();
  }
  dispatch({ type: actionTypes.REGISTER_REQUEST });
  try {
    const user = await makeApiRequestWithBody('/api/register', 'post', values);
    dispatch({ type: actionTypes.REGISTER_SUCCESS, user });
    history.push('/dashboard/surveys');
  } catch (err) {
    dispatch({ type: actionTypes.REGISTER_FAILURE, err });
  }
};

export const handleLogin = (credentials, history) => async (
  dispatch,
  getState
) => {
  if (getIsFetching(getState(), 'user')) {
    return Promise.resolve();
  }
  dispatch({ type: actionTypes.LOGIN_REQUEST });
  try {
    const user = await makeApiRequestWithBody(
      '/api/login',
      'post',
      credentials
    );
    dispatch({ type: actionTypes.LOGIN_SUCCESS, user });
    history.push('/dashboard/surveys');
  } catch (err) {
    dispatch({ type: actionTypes.LOGIN_FAILURE, err });
  }
};

export const handleToken = token => async dispatch => {
  dispatch({ type: actionTypes.VERIFY_TOKEN_REQUEST });
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
    dispatch({ type: actionTypes.VERIFY_TOKEN_SUCCESS, user });
  } catch (err) {
    dispatch({ type: actionTypes.VERIFY_TOKEN_FAILURE, err });
  }
};

export const fetchSurveys = () => async (dispatch, getState) => {
  if (getIsFetching(getState(), 'surveys')) {
    return Promise.resolve();
  }
  dispatch({ type: actionTypes.FETCH_SURVEYS_REQUEST });
  try {
    const surveysRes = await makeApiRequestWithoutBody('/api/surveys', 'get');
    const surveys = surveysRes.map(curr => {
      const { _id: id, _id, ...rest } = curr;
      return { id, ...rest };
    });
    const normalisedSurveys = normalize(surveys, schema.surveyListSchema);
    dispatch({
      type: actionTypes.FETCH_SURVEYS_SUCCESS,
      surveys: normalisedSurveys
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_SURVEYS_FAILURE,
      err
    });
  }
};

export const createSurvey = (values, history) => async dispatch => {
  dispatch({ type: actionTypes.CREATE_SURVEY_REQUEST });
  try {
    const res = await makeApiRequestWithBody('/api/surveys', 'post', values);
    const { user, survey } = res;
    const { _id: id, ...rest } = survey;
    const newSurvey = { id, ...rest };
    const normalisedSurvey = normalize(newSurvey, schema.surveySchema);
    dispatch({
      type: actionTypes.CREATE_SURVEY_SUCCESS,
      user,
      surveys: normalisedSurvey
    });
    history.push('/dashboard/surveys');
  } catch (err) {
    dispatch({ type: actionTypes.CREATE_SURVEY_FAILURE, err });
  }
};

export const deleteSurvey = surveyId => async dispatch => {
  dispatch({ type: actionTypes.DELETE_SURVEY_REQUEST });
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
    dispatch({
      type: actionTypes.DELETE_SURVEY_SUCCESS,
      surveys: { result: surveyId }
    });
  } catch (err) {
    dispatch({ type: actionTypes.DELETE_SURVEY_FAILURE, err });
  }
};

export const fetchRecipients = surveyId => async (dispatch, getState) => {
  if (getIsFetching(getState(), 'recipients')) {
    return Promise.resolve();
  }
  dispatch({ type: actionTypes.FETCH_RECIPIENTS_REQUEST });
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
      type: actionTypes.FETCH_RECIPIENTS_SUCCESS,
      recipients: normalisedRecipients
    });
  } catch (err) {
    dispatch({ type: actionTypes.FETCH_RECIPIENTS_FAILURE, err });
  }
};
