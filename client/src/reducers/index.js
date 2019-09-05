import { combineReducers } from 'redux';
import userReducer, * as fromUser from './userReducer';
import surveysReducer, * as fromSurveys from './surveysReducer';
import recipientsReducer, * as fromRecipients from './recipientsReducer';

export default combineReducers({
  user: userReducer,
  surveys: surveysReducer,
  recipients: recipientsReducer
});

//generates a function that allows you to get a field shared amongst multiple entity types
//In this case, an entity will be surveys, recipients or user
const getFieldForEntityType = fieldName => (state, entityType) => {
  const capitalisedFieldName = fieldName[0].toUpperCase() + fieldName.slice(1);
  const funcName = `get${capitalisedFieldName}`;
  switch (entityType) {
    case 'surveys':
      return fromSurveys[funcName](state.surveys);
    case 'recipients':
      return fromRecipients[funcName](state.recipients);
    case 'user':
      return fromUser[funcName](state.user);
    default:
      return state;
  }
};

//Functions that get a field shared amongst multiple entity types
export const getError = getFieldForEntityType('error');
export const getIsFetching = getFieldForEntityType('isFetching');

//functions that get a field that is unique to it's entity
export const getUser = ({ user }) => fromUser.getUser(user);
export const getSurveys = ({ surveys }) => fromSurveys.getSurveys(surveys);
export const getSurveyById = ({ surveys }, id) =>
  fromSurveys.getSurveyById(surveys, id);
export const getRecipients = ({ recipients }) =>
  fromRecipients.getRecipients(recipients);
