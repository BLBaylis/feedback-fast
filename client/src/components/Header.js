import React, { Component, Fragment } from 'react';
import { fetchUser } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StripePayments from './StripePayments';

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const margin10 = { margin: '10px' };

class Header extends Component {
  createContentBasedOnAuthStatus() {
    switch (this.props.auth) {
      case null:
        return [
          <span style={margin10} key={'authUnknownLink'}>
            Log in with Google
          </span>,
          'Checking auth'
        ];
      case false:
        return [
          <a style={margin10} key={'loggedOutLink'} href="/auth/google">
            Log in with Google
          </a>,
          'Logged out'
        ];
      default:
        return [
          <a style={margin10} key={'loggedInLink'} href="/api/logout">
            Logout
          </a>,
          'Logged In!'
        ];
    }
  }

  testSurveys = async () => {
    const res = await fetch('/api/surveys', {
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
        <header>
          <Link to={auth ? '/dashboard' : '/'}>FeedbackFast</Link>
          {link}
          <span style={margin10}>{authStatus}</span>
          {auth && <StripePayments />}
        </header>
        {auth && <span>{`Id: ${auth._id}   Credits:${auth.credits}`}</span>}
        {auth && <button onClick={this.testSurveys}>Test</button>}
      </Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(Header);
