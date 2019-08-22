import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100%'
};

const LandingPage = () => {
  return (
    <Container style={containerStyles}>
      <h1>Welcome to Feedback Fast!</h1>
      <Button
        style={{ display: 'inline-block' }}
        size="large"
        variant="contained"
        component={RouterLink}
        to="/register"
      >
        Sign up
      </Button>
      <Button
        style={{ display: 'inline-block' }}
        size="large"
        variant="contained"
        component={RouterLink}
        to="/login"
      >
        Log in
      </Button>
    </Container>
  );
};

export default LandingPage;
