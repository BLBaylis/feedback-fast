import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SurveyCreator from './surveyCreator/SurveyCreator';
import SurveyDetails from './surveyList/SurveyDetails';
import SurveyList from './surveyList/SurveyList';
import FailedPaymentDialog from './FailedPaymentDialog';
import Header from './Header';
import { getIsFetching, getError } from '../reducers';

const Dashboard = ({ isFetching, error }) => {
  return (
    <Fragment>
      <Header />
      <div style={{ position: 'relative', height: 'calc(100% - 36px - 2rem)' }}>
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
      </div>
      {!isFetching && error.code && <FailedPaymentDialog error={error} />}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isFetching: getIsFetching(state, 'billing'),
  error: getError(state, 'billing')
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
