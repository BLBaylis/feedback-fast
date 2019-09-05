import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Grid, Typography, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { fetchSurveys } from '../../actions';
import { getSurveys, getIsFetching, getError } from '../../reducers';
import SurveyCard from './SurveyCard';
import ErrorBoundary from '../ErrorBoundary';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  createSurveys = () => {
    return this.props.surveys.reverse().map(survey => {
      const { id } = survey;
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={`grid-${id}`}>
          <SurveyCard id={id} />
        </Grid>
      );
    });
  };

  render() {
    const { isFetching, surveys, error } = this.props;
    if (error.status) {
      throw new Error(error.status);
    }
    if (isFetching && !surveys.length) {
      return <h1>Loading...</h1>;
    }
    return (
      <Container>
        <RouterLink to="/dashboard/surveys/new">
          <Fab
            color="primary"
            aria-label="new survey"
            size="large"
            style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          >
            <AddIcon />
          </Fab>
        </RouterLink>

        <Typography
          gutterBottom
          variant="h4"
          component="h1"
          text="primary"
          style={{ textAlign: 'center', margin: '1.5rem auto' }}
        >
          Surveys
        </Typography>
        <Grid container spacing={3} style={{ marginBottom: '12px' }}>
          {this.createSurveys()}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  surveys: getSurveys(state),
  isFetching: getIsFetching(state, 'surveys'),
  error: getError(state, 'surveys')
});

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
