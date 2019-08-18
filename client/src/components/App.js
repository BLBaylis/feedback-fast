import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import Header from './Header';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    console.log('APP AUTH', this.props);
    const auth = this.props.auth;
    return (
      <Fragment>
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={LandingPage} />
          {auth !== null && (
            <PrivateRoute path="/dashboard" auth={auth} component={Dashboard} />
          )}
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default connect(
  ({ auth }) => ({ auth }),
  { fetchUser }
)(App);
