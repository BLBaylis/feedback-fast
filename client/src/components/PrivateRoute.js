import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ auth, component: Component, render, ...rest }) => {
  return (
    <React.Fragment>
      {auth && Component && <Route {...rest} component={Component} />}
      {auth && render && <Route {...rest} render={render} />}
      {!auth && <Redirect to={{ pathname: '/' }} />}
    </React.Fragment>
  );
};

export default PrivateRoute;
