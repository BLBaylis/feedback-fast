import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { submitSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';
import EmailCreation from './EmailCreation';
import EmailRecipients from './EmailRecipients';
import Review from './Review';

class Survey extends React.Component {
  state = {
    page: 'emailCreation'
  };

  updatePage = pageName => {
    this.setState({
      page: pageName
    });
  };

  onSubmit = async (values, { setSubmitting }) => {
    const {
      surveyName: title,
      surveySubject: subject,
      surveyBody: body,
      surveyRecipients: recipients
    } = values;
    console.log('submitted!', { title, subject, body, recipients });
    await this.props.submitSurvey(
      {
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => email.trim())
      },
      this.props.history
    );
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
              {this.state.page === 'emailCreation' && (
                <EmailCreation
                  formProps={formProps}
                  updatePage={this.updatePage}
                  checkFieldIsValidated={this.checkFieldIsValidated}
                />
              )}
              {this.state.page === 'recipients' &&
                !this.state.recipientsDone && (
                  <EmailRecipients
                    formProps={formProps}
                    updatePage={this.updatePage}
                    checkFieldIsValidated={this.checkFieldIsValidated}
                  />
                )}
              {this.state.page === 'review' && (
                <Review formProps={formProps} updatePage={this.updatePage} />
              )}
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default withRouter(
  connect(
    null,
    { submitSurvey }
  )(Survey)
);
