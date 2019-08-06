import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import EmailCreation from './EmailCreation';
import EmailRecipients from './EmailRecipients';
import Review from './Review';

class Survey extends React.Component {
  state = {
    emailCreationDone: false,
    recipientsDone: false
  };

  updatePageStatus = pageName => {
    this.setState(prevState => ({
      [`${pageName}Done`]: !prevState[`${pageName}Done`]
    }));
  };

  onSubmit = (values, { setSubmitting }) => {
    console.log('submitted!', values);
    setSubmitting(false);
  };

  checkFieldIsValidated = (fieldName, formProps) => {
    const { errors, touched } = formProps;
    return touched[fieldName] === true && errors[fieldName] === undefined;
  };

  validationSchema = () => {
    return yup.object().shape({
      surveyName: yup
        .string()
        .max(30, 'Max 30 characters')
        .required('This field is required'),
      surveySubject: yup
        .string()
        .max(30, 'Max 30 characters')
        .required('This field is required'),
      surveyBody: yup.string().required('This field is required'),
      surveyRecipients: yup.string().required('This field is required')
    });
  };

  render() {
    console.log(this.state);
    return (
      <Formik
        initialValues={{
          surveyName: '',
          surveySubject: '',
          surveyBody: '',
          surveyRecipients: ''
        }}
        onSubmit={this.onSubmit}
        validationSchema={this.validationSchema}
      >
        {formProps => {
          return (
            <Form>
              {!this.state.emailCreationDone && (
                <EmailCreation
                  formProps={formProps}
                  updatePageStatus={this.updatePageStatus}
                  checkFieldIsValidated={this.checkFieldIsValidated}
                />
              )}
              {this.state.emailCreationDone && !this.state.recipientsDone && (
                <EmailRecipients
                  formProps={formProps}
                  updatePageStatus={this.updatePageStatus}
                  checkFieldIsValidated={this.checkFieldIsValidated}
                />
              )}
              {this.state.emailCreationDone && this.state.recipientsDone && (
                <Review
                  formProps={formProps}
                  updatePageStatus={this.updatePageStatus}
                />
              )}
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default Survey;
