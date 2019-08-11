import React from 'react';
import SurveyCreator from './surveyCreator/SurveyCreator.js';
import SurveyList from './surveyList/SurveyList';
import Container from '@material-ui/core/Container';

const Dashboard = () => {
  return (
    <Container>
      <SurveyList />
    </Container>
  );
};

export default Dashboard;
