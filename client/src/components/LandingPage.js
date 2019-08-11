import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100%'
};

const LandingPage = ({ auth }) => {
  return (
    <Container style={containerStyles}>
      <h1>Welcome to Feedback Fast!</h1>
      {auth && <Redirect to="/dashboard" />}
      <Button
        style={{ display: 'inline-block' }}
        size="large"
        variant="contained"
      >
        Sign up!
      </Button>
    </Container>
  );
};

export default connect(
  ({ auth }) => ({ auth }),
  null
)(LandingPage);
