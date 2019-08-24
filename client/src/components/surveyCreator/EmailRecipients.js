import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Typography } from '@material-ui/core';
import emailValidator from '../../utils/emailValidator';

const recipientsValidation = emails => {
  if (!emails) {
    return 'This field is required';
  }
  const { invalidEmails, duplicateEmails } = emailValidator(emails);
  if (invalidEmails.length > 0) {
    return `The following emails are invalid: ${invalidEmails.join(', ')}`;
  }
  if (duplicateEmails.length > 0) {
    return `The following emails are duplicates: ${duplicateEmails.join(', ')}`;
  }
};

const EmailRecipients = ({ checkFieldIsValidated, updatePage, formProps }) => {
  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Recipients
      </Typography>
      <p>Enter a list of recipient email addresses separated by commas!</p>
      <Field
        label="Recipients"
        validate={recipientsValidation}
        component={TextField}
        multiline
        fullWidth
        placeholder="recipient1@email.com, recipient2@email.com, recipient3@email.com"
        name="surveyRecipients"
        rows={15}
      />
    </React.Fragment>
  );
};

export default EmailRecipients;
