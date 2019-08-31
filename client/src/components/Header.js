import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import StripePayments from './StripePayments';

const styles = {
  colorWhite: { color: 'white' },
  navLink: {
    color: 'black',
    margin: '1rem 1rem 1rem 0',
    textAlign: 'center'
  }
};

const Header = ({ auth }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      {auth && (
        <Typography
          style={styles.navLink}
        >{`Credits: ${auth.credits}`}</Typography>
      )}
      {auth && <StripePayments style={styles.navLink} />}
      {/*auth && (
        <Button
          variant="outlined"
          component={'a'}
          href="/api/logout"
          style={styles.navLink}
        >
          Log Out
        </Button>
      )*/}
    </div>
  );
};

export default withRouter(connect(({ auth }) => ({ auth }))(Header));
