/** @jsx jsx */
import { useState } from 'react';
import { jsx } from '@emotion/core';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { submitSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Paper,
  Typography,
  Container,
  useMediaQuery
} from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import { ComposeEmail, EmailRecipients, Review } from './FormPages';
import { Stepper, MobileStepper } from './Steppers';

const Survey = ({ submitSurvey, history }) => {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = !useMediaQuery('(min-width:650px)');
  const steps = ['Survey Details', 'Recipients', 'Review your survey'];

  const pageFields = [
    ['name', 'subject', 'body'],
    ['recipients'],
    ['name', 'subject', 'body', 'recipients']
  ];

  const getStepContent = (step, formProps) => {
    switch (step) {
      case 0:
        return <ComposeEmail isMobile={isMobile} />;
      case 1:
        return <EmailRecipients isMobile={isMobile} />;
      case 2:
        return <Review formProps={formProps} />;
      default:
        throw new Error('Unknown step');
    }
  };

  const handleStep = newActiveStep => () => setActiveStep(newActiveStep);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { name: title, subject, body, recipients } = values;
    await submitSurvey(
      {
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => email.trim())
      },
      history
    );
    setSubmitting(false);
  };

  const checkFieldIsValidated = (fieldName, { errors, touched }) => {
    return touched[fieldName] === true && errors[fieldName] === undefined;
  };

  const validationSchema = () => {
    return yup.object().shape({
      name: yup
        .string()
        .max(75, 'Max 75 characters')
        .required('This field is required'),
      subject: yup
        .string()
        .max(75, 'Max 75 characters')
        .required('This field is required'),
      body: yup.string().required('This field is required'),
      recipients: yup.string().required('This field is required')
    });
  };
  const isStep1 = activeStep === 0;
  const isReviewStep = activeStep === 2;
  const allStepsDone = activeStep === steps.length;
  const btnType = isReviewStep ? 'submit' : 'button';
  const WrapperComponent = isMobile ? Container : Paper;
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'flex-start',
        height: '100%',
        width: '100%',
        '@media (min-width : 650px) and (min-height: 650px)': {
          alignItems: isReviewStep ? 'flex-start' : 'center'
        }
      }}
    >
      <WrapperComponent
        css={{
          width: '100%',
          height: '100%',
          '@media (min-width: 650px)': {
            padding: '24px',
            margin: '0 auto',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '625px',
            marginBottom: '1.5rem'
          }
        }}
      >
        {allStepsDone && <Typography variant="h6">Survey Sent!</Typography>}
        <Formik
          initialValues={{
            name: '',
            subject: '',
            body: '',
            recipients: ''
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {formProps => {
            return (
              <Form style={{ width: '100%', height: '100%' }}>
                {!allStepsDone && !isMobile && (
                  <Stepper steps={steps} activeStep={activeStep} />
                )}
                {!allStepsDone && getStepContent(activeStep, formProps)}
                {!allStepsDone && !isMobile && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {!isStep1 && (
                      <Button
                        type="button"
                        style={{ margin: '24px 8px 0 0' }}
                        onClick={handleStep(activeStep - 1)}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      style={{ margin: '24px 8px 0 0' }}
                      key={`btn-${btnType}`}
                      type={btnType}
                      variant="contained"
                      color="primary"
                      onClick={
                        btnType === 'button' ? handleStep(activeStep + 1) : null
                      }
                      disabled={
                        formProps.isValidating ||
                        !pageFields[activeStep].every(fieldName =>
                          checkFieldIsValidated(fieldName, formProps)
                        )
                      }
                    >
                      {isReviewStep ? 'Send Survey' : 'Next'}
                    </Button>
                  </div>
                )}
                {!allStepsDone && isMobile && (
                  <MobileStepper
                    style={{
                      position: 'fixed',
                      bottom: 0,
                      left: 0,
                      width: '100vw',
                      boxSizing: 'border-box'
                    }}
                    activeStep={activeStep}
                    handleStep={handleStep}
                    nextButton={
                      <Button
                        key={`btn-${btnType}-mob`}
                        type={btnType}
                        onClick={
                          btnType === 'button'
                            ? handleStep(activeStep + 1)
                            : null
                        }
                        size="small"
                        disabled={
                          formProps.isValidating ||
                          !pageFields[activeStep].every(fieldName =>
                            checkFieldIsValidated(fieldName, formProps)
                          )
                        }
                      >
                        {isReviewStep ? 'Send' : 'Next'}
                        <KeyboardArrowRight />
                      </Button>
                    }
                  />
                )}
              </Form>
            );
          }}
        </Formik>
      </WrapperComponent>
    </div>
  );
};

export default withRouter(
  connect(
    null,
    { submitSurvey }
  )(Survey)
);
