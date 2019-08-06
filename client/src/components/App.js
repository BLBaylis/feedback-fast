import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import Header from './Header';
import Survey from './survey/Survey.js';

const LandingPage = () => {
  return (
    <div>
      <h1>Hi from Landing Page</h1>
      <Survey />
    </div>
  );
};
const Dashboard = () => <h1>Hi from Dashboard</h1>;
const dummyComp3 = () => <h1>Hi from 3</h1>;
const dummyComp4 = () => <h1>Hi from 4</h1>;

class App extends Component {
  componentWillMount() {
    console.log(this.props.fetchUser);
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={LandingPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/3" exact component={dummyComp3} />
            <Route path="/4" exact component={dummyComp4} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
