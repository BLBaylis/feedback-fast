import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  Link as MuiLink,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import googleIcon from '../assets/google-icon.svg';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { TextField } from 'formik-material-ui';
import { handleRegister } from '../actions/index';

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
    margin: '112px 0'
  },
  avatar: {
    margin: '8px',
    background: '#3f51b5'
  },
  button: {
    margin: '16px 0',
    padding: '16px'
  },
  divider: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    margin: '20px 0'
  },
  hr: {
    borderBottom: '1px solid #00070926',
    flex: '1 1 45%'
  }
};

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(25, 'Too many characters.')
    .required('This field is required.'),
  lastName: yup
    .string()
    .max(25, 'Too many characters.')
    .required('This field is required.'),
  email: yup
    .string()
    .email()
    .required('This field is required.'),
  password: yup
    .string('This field is required.')
    .min(8, 'Password must be at least 8 characters long.')
    .required('This field is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
});

const Register = ({ handleRegister, history }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    await handleRegister(values, history);
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={styles.paper}>
        <Avatar style={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Button
          variant="contained"
          href="/auth/google"
          fullWidth
          style={{ background: '#fff', marginTop: '16px', padding: '16px' }}
        >
          <img
            src={googleIcon}
            style={{ height: '24px', marginRight: '16px' }}
            alt="google logo"
          />
          Register with Google
        </Button>
        <div style={styles.divider}>
          <div style={styles.hr}></div>
          <Typography variant="body1" style={{ margin: '0 15px' }}>
            or
          </Typography>
          <div style={styles.hr}></div>
        </div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Button
                disabled={isSubmitting}
                style={styles.button}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Register
              </Button>
              <MuiLink component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </MuiLink>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default withRouter(
  connect(
    null,
    { handleRegister }
  )(Register)
);
