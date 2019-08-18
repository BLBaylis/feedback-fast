import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import SurveyCreator from './surveyCreator/SurveyCreator';
import SurveyDetails from './surveyList/SurveyDetails';
import SurveyList from './surveyList/SurveyList';

const Dashboard = props => {
  return (
    <Container style={{ paddingTop: '64px', position: 'relative' }}>
      <Switch>
        <Route
          path="/dashboard"
          exact
          render={props => <Redirect path="/dashboard/surveys" {...props} />}
        />
        <Route path="/dashboard/surveys" component={SurveyList} exact />
        <Route path="/dashboard/surveys/new" component={SurveyCreator} />
        <Route path="/dashboard/surveys/:id" component={SurveyDetails} />
      </Switch>
    </Container>
  );
};

export default Dashboard;
