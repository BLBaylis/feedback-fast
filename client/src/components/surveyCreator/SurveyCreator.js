import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { submitSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';
import { Button, Paper, Stepper, Step, StepLabel } from '@material-ui/core';
import EmailCreation from './EmailCreation';
import EmailRecipients from './EmailRecipients';
import Review from './Review';

class Survey extends React.Component {
  state = {
    activeStep: 0
  };

  steps = ['Survey Details', 'Recipients', 'Review your survey'];

  pageFields = [
    ['surveyName', 'surveySubject', 'surveyBody'],
    ['surveyRecipients'],
    ['surveyName', 'surveySubject', 'surveyBody', 'surveyRecipients']
  ];

  setActiveStep = direction => {
    const stepChange = direction === 'back' ? -1 : 1;
    this.setState(prevState => ({
      activeStep: prevState.activeStep + stepChange
    }));
  };

  getStepContent = (step, formProps) => {
    const props = {
      formProps,
      updatePage: this.updatePage,
      checkFieldIsValidated: this.checkFieldIsValidated
    };
    switch (step) {
      case 0:
        return <EmailCreation {...props} />;
      case 1:
        return <EmailRecipients {...props} />;
      case 2:
        return <Review {...props} />;
      default:
        throw new Error('Unknown step');
    }
  };

  onSubmit = async (values, { setSubmitting }) => {
    const {
      surveyName: title,
      surveySubject: subject,
      surveyBody: body,
      surveyRecipients: recipients
    } = values;
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
      <div style={{ width: '600px', margin: '0 auto' }}>
        <Paper style={{ padding: '24px', margin: '112px 0' }}>
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
              const { activeStep } = this.state;
              const btnType =
                activeStep !== this.steps.length - 1 ? 'button' : 'submit';
              console.log(btnType);
              return (
                <Form>
                  <Stepper activeStep={activeStep}>
                    {this.steps.map(label => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {this.getStepContent(activeStep, formProps)}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button
                        style={{ margin: '24px 8px 0 0' }}
                        onClick={() => this.setActiveStep('back')}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      style={{ margin: '24px 8px 0 0' }}
                      type={btnType}
                      variant="contained"
                      color="primary"
                      onClick={() => this.setActiveStep('next')}
                      disabled={
                        formProps.isValidating ||
                        !this.pageFields[activeStep].every(fieldName =>
                          this.checkFieldIsValidated(fieldName, formProps)
                        )
                      }
                    >
                      {activeStep !== this.steps.length - 1
                        ? 'Next'
                        : 'Send Survey'}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { submitSurvey }
  )(Survey)
);
