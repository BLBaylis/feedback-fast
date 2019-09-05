import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import { getUser, getIsFetching, getError } from '../reducers';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <BrowserRouter>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {user !== null && (
            <PrivateRoute
              path="/dashboard"
              auth={!!user}
              component={Dashboard}
            />
          )}
        </BrowserRouter>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  isFetching: getIsFetching(state, 'user'),
  error: getError(state, 'user')
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
