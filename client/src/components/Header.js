import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import StripePayments from './StripePayments';

const Header = ({ auth }) => {
  return (
    <Fragment>
      <AppBar>
        <Toolbar style={{ justifyContent: 'flex-end' }}>
          <Button
            component={RouterLink}
            to={auth ? '/dashboard/surveys' : '/'}
            style={{ color: 'white', marginRight: 'auto' }}
          >
            FeedbackFast
          </Button>
          {auth && <StripePayments />}
          {auth && <span>{`Credits: ${auth.credits}`}</span>}
          <Button component={RouterLink} to="/login" style={{ color: 'white' }}>
            Log in
          </Button>
          {auth && (
            <Button
              component={'a'}
              href="/api/logout"
              style={{ color: 'white' }}
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default withRouter(connect(({ auth }) => ({ auth }))(Header));
