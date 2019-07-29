import React, { Component } from 'react';
import { fetchUser } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = ({ auth }) => {
  return { auth };
};

class Header extends Component {
  renderBasedOnAuthStatus() {
    switch (this.props.auth) {
      case null:
        return 'Checking auth';
      case false:
        return 'Logged out';
      default:
        return 'Logged in!';
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <header>
        <Link to={auth ? '/dashboard' : '/'}>FeedbackFast</Link>
        {auth && (
          <a style={{ margin: '10px' }} href="/api/logout">
            Logout
          </a>
        )}
        {auth === false && (
          <a style={{ margin: '10px' }} href="/auth/google">
            Log in with Google
          </a>
        )}
        {auth === null && (
          <span style={{ margin: '10px' }}>Log in with Google</span>
        )}
        <span>{this.renderBasedOnAuthStatus()}</span>
      </header>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(Header);
