import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import Header from './Header';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import SurveyCreator from './surveyCreator/SurveyCreator';

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={LandingPage} />
          <PrivateRoute
            auth={this.props.auth}
            path="/dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            auth={this.props.auth}
            path="/surveys/new"
            component={SurveyCreator}
          />
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default connect(
  ({ auth }) => ({ auth }),
  { fetchUser }
)(App);
