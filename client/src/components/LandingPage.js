import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Button, Container, Typography } from '@material-ui/core';
import background from '../assets/background.png';

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100%',
  position: 'relative',
  width: '50%',
  margin: '0 0 0 auto'
};

const LandingPage = ({ auth }) => {
  return (
    <Fragment>
      <div className="img-container"></div>
      <Container className="content-container" style={containerStyles}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="h2" style={{ color: '#fff' }}>
            Knowledge is power
          </Typography>
          <Typography
            variant="h6"
            style={{
              marginTop: '20px',
              color: '#fff',
              textAlign: 'center',
              maxWidth: '400px'
            }}
          >
            Get that crucial data you need to push your business in the right
            direction with our quick and easy marketing surveys
          </Typography>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '400px'
            }}
          >
            <Button
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                margin: '0 10px'
              }}
              size="large"
              variant="contained"
              component={RouterLink}
              to="/register"
            >
              Sign up
            </Button>
            <Button
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                margin: '0 10px'
              }}
              size="large"
              variant="contained"
              component={RouterLink}
              to="/login"
            >
              Log in
            </Button>
          </div>

          {auth && <Redirect to="/dashboard/surveys" />}
        </div>
      </Container>
    </Fragment>
  );
};

export default connect(
  ({ auth }) => ({ auth }),
  null
)(LandingPage);
