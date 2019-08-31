import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import SurveyCreator from './surveyCreator/SurveyCreator';
import SurveyDetails from './surveyList/SurveyDetails';
import SurveyList from './surveyList/SurveyList';
import Header from './Header';

const Dashboard = props => {
  return (
    <Fragment>
      <Header />
      <Container
        style={{ position: 'relative', height: 'calc(100% - 36px - 2rem)' }}
      >
        <Switch>
          <Route
            path="/dashboard"
            exact
            render={props => <Redirect to="/dashboard/surveys" {...props} />}
          />
          <Route path="/dashboard/surveys" component={SurveyList} exact />
          <Route path="/dashboard/surveys/new" component={SurveyCreator} />
          <Route path="/dashboard/surveys/:id" component={SurveyDetails} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
