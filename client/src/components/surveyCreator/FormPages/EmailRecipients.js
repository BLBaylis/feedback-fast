/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import emailValidator from '../../../utils/emailValidator';

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

const EmailRecipients = ({ isMobile }) => {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'flex-start',
        '@media (min-height: 420px) and (max-width: 650px)': {
          height: '100%',
          alignItems: 'center'
        }
      }}
    >
      <div
        css={{
          '@media (min-height: 420px) and (max-width: 650px)': {
            position: 'relative',
            top: 'calc(-18px - 1rem)'
          },
          width: '100%'
        }}
      >
        <p>Enter a list of recipient email addresses separated by commas!</p>
        <Field
          label="Recipients"
          validate={recipientsValidation}
          component={TextField}
          multiline
          fullWidth
          placeholder="recipient1@email.com, recipient2@email.com, recipient3@email.com"
          name="recipients"
          rows={isMobile ? 10 : 15}
          css={{ marginBottom: '16px' }}
        />
        <div
          css={{ height: '48px', '@media (min-height: 420px)': { height: 0 } }}
        ></div>
      </div>
    </div>
  );
};

export default EmailRecipients;
