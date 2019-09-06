import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import StripePayments from './StripePayments';
import { getUser, getIsFetching, getError } from '../reducers';

const styles = {
  colorWhite: { color: 'white' },
  navLink: {
    color: 'black',
    margin: '1rem 1rem 1rem 0',
    textAlign: 'center'
  }
};

const Header = ({ user }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      {user && (
        <Typography
          style={styles.navLink}
        >{`Credits: ${user.credits}`}</Typography>
      )}
      {user && <StripePayments style={styles.navLink} />}
      {user && (
        <Button
          variant="outlined"
          component={'a'}
          href="/api/logout"
          style={styles.navLink}
        >
          Log Out
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: getUser(state),
  isFetching: getIsFetching(state, 'user'),
  error: getError(state, 'user')
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Header)
);
