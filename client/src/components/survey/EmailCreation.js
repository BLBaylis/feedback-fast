import React from 'react';
import { Field, ErrorMessage } from 'formik';

const labelStyle = {
  display: 'block',
  margin: '15px auto'
};

class EmailCreation extends React.Component {
  render() {
    const { updatePageStatus, checkFieldIsValidated, formProps } = this.props;
    return (
      <React.Fragment>
        <h1>Email Creation</h1>
        <label htmlFor="surveyTitle" style={labelStyle}>
          Survey Name:
          <Field type="text" name="surveyName" placeholder="My Survey" />
        </label>
        <ErrorMessage name="surveyName" />
        <label htmlFor="surveySubject" style={labelStyle}>
          Email Subject:
          <Field
            type="text"
            name="surveySubject"
            placeholder="Tell us what you thought of our new feature!"
          />
        </label>
        <ErrorMessage name="surveySubject" />
        <label htmlFor="surveyBody" style={labelStyle}>
          Email Body:
          <Field component="textarea" name="surveyBody" rows="5" cols="50" />
        </label>
        <ErrorMessage name="surveyBody" />
        <button
          type="button"
          onClick={() => updatePageStatus('emailCreation')}
          disabled={
            formProps.isValidating ||
            !checkFieldIsValidated('surveyName', formProps) ||
            !checkFieldIsValidated('surveySubject', formProps) ||
            !checkFieldIsValidated('surveyBody', formProps)
          }
        >
          Next
        </button>
      </React.Fragment>
    );
  }
}

export default EmailCreation;
