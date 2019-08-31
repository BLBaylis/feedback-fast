import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';
import { TextField } from 'formik-material-ui';
import googleIcon from '../assets/google-icon.svg';
import {
  Button,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Link as MuiLink
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { handleLogin } from '../actions/index';

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px'
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
  email: yup.string().email(),
  password: yup.string()
});

const Login = ({ handleLogin, history }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    await handleLogin(
      {
        email,
        password
      },
      history
    );
    setSubmitting(false);
  };

  return (
    <Container className="login-container" component="main" maxWidth="xs">
      <CssBaseline />
      <div style={styles.paper}>
        <Avatar style={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
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
          Log in with Google
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
            email: '',
            password: ''
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {formProps => {
            return (
              <Form style={styles.form}>
                <Field
                  label="Email"
                  type="email"
                  name="email"
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                  style={{ marginTop: 0 }}
                />
                <Field
                  label="Password"
                  type="password"
                  name="password"
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                />
                <Button
                  style={styles.button}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
              </Form>
            );
          }}
        </Formik>
        <MuiLink component={RouterLink} to="/register" variant="body2">
          Don't have an account? Sign Up
        </MuiLink>
      </div>
    </Container>
  );
};

export default withRouter(
  connect(
    null,
    { handleLogin }
  )(Login)
);
