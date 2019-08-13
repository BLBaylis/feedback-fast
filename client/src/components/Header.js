import React, { Component, Fragment } from 'react';
import { fetchUser } from '../actions';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Link as MuiLink, Button } from '@material-ui/core';
import StripePayments from './StripePayments';

const mapStateToProps = ({ auth }) => {
  return { auth };
};

class Header extends Component {
  createContentBasedOnAuthStatus() {
    let component = MuiLink;
    let disabled = false;
    let btnText = 'Login with Google';
    let key, href, authStatus;

    switch (this.props.auth) {
      case null:
        disabled = true;
        key = 'authUnknownLink';
        authStatus = 'Checking auth...';
        break;
      case false:
        key = 'loggedOutLink';
        href = '/auth/google';
        authStatus = 'Logged out';
        break;
      default:
        key = 'loggedInLink';
        href = '/api/logout';
        authStatus = 'Logged In!';
        btnText = 'Log out';
    }
    return [
      <Button
        style={{ color: 'white', margin: '0 10px' }}
        component={component}
        disabled={disabled}
        key={key}
        href={href}
      >
        {btnText}
      </Button>,
      authStatus
    ];
  }

  testSurveys = async () => {
    await fetch('/api/surveys', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Test Email (title)',
        recipients: ['bradleybaylis@hotmail.com'],
        subject: 'Test email (subject)',
        body: 'This is an email body (body)'
      })
    });
  };

  render() {
    const [link, authStatus] = this.createContentBasedOnAuthStatus();
    const { auth } = this.props;
    return (
      <Fragment>
        <AppBar>
          <Toolbar style={{ justifyContent: 'flex-end' }}>
            <Button
              component={RouterLink}
              to={auth ? '/dashboard' : '/'}
              style={{ color: 'white', marginRight: 'auto' }}
            >
              FeedbackFast
            </Button>
            <span style={{ margin: '0 10px' }}>{authStatus}</span>
            {link}
          </Toolbar>
        </AppBar>
        {/*<header>{auth && <StripePayments />}</header>}
        auth && <span>{`Id: ${auth._id}   Credits:${auth.credits}`}</span>
    auth && <button onClick={this.testSurveys}>Test</button>*/}
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(Header);
