import React from 'react';
import { Field, ErrorMessage } from 'formik';
import emailValidator from '../../utils/emailValidator';

const recipientsValidation = emails => {
  if (!emails) {
    return 'This field is required';
  }
  const { invalidEmails } = emailValidator(emails);
  if (invalidEmails.length > 0) {
    return `The following emails are invalid: ${invalidEmails.join(', ')}`;
  }
};

const EmailRecipients = ({ checkFieldIsValidated, updatePage, formProps }) => {
  return (
    <React.Fragment>
      <h1>EmailRecipients</h1>
      <p>Enter a list of recipient email addresses separated by commas!</p>
      <label htmlFor="surveyRecipients">
        Recipients:
        <Field
          validate={recipientsValidation}
          component="textarea"
          placeholder="recipient1@email.com, recipient2@email.com, recipient3@email.com"
          name="surveyRecipients"
          rows="15"
          cols="50"
        />
      </label>
      <ErrorMessage name="surveyRecipients" />
      <button type="button" onClick={() => updatePage('emailCreation')}>
        Back
      </button>
      <button
        type="button"
        onClick={() => updatePage('review')}
        disabled={
          formProps.isValidating ||
          !checkFieldIsValidated('surveyRecipients', formProps)
        }
      >
        Next
      </button>
    </React.Fragment>
  );
};

export default EmailRecipients;
