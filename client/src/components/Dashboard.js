import React from 'react';
import SurveyList from './surveyList/SurveyList';
import Container from '@material-ui/core/Container';

const Dashboard = () => {
  return (
    <Container style={{ paddingTop: '64px', position: 'relative' }}>
      <SurveyList />
    </Container>
  );
};

export default Dashboard;
