import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { Link as MuiLink, Button } from '@material-ui/core';
import StripePayments from './StripePayments';
import Logo from './Logo';

const styles = {
  colorWhite: { color: 'white' },
  navLink: {
    color: 'black',
    margin: '0 1rem'
  }
};

const Header = ({ auth }) => {
  return (
    <div style={{ position: 'absolute', top: '1rem' }}>
      <MuiLink
        component={RouterLink}
        to={auth ? '/dashboard/surveys' : '/'}
        style={{
          ...styles.colorWhite,
          marginRight: 'auto',
          padding: 0
        }}
      >
        <Logo style={{ height: '60px', width: 'auto' }} />
      </MuiLink>
      {auth && <StripePayments style={styles.navLink} />}
      {auth && <span style={styles.navLink}>{`Credits: ${auth.credits}`}</span>}
      {auth && (
        <Button component={'a'} href="/api/logout" style={styles.navLink}>
          Log Out
        </Button>
      )}
    </div>
  );
};

export default withRouter(connect(({ auth }) => ({ auth }))(Header));
