import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Grid, Typography, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { fetchSurveys } from '../../actions';
import { getSurveys, getIsFetching, getError } from '../../reducers';
import SurveyCard from './SurveyCard';
import CenteredStatusIndicator from '../CenteredStatusIndicator';

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
    let { isFetching, error, surveys } = this.props;
    return (
      <Fragment>
        {
          <CenteredStatusIndicator>
            {isFetching ? 'Loading your surveys...' : null}
            {error.status && !surveys.length ? 'Something went wrong!' : null}
          </CenteredStatusIndicator>
        }
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
          {!isFetching && (
            <Fragment>
              <Typography
                gutterBottom
                variant="h4"
                component="h1"
                text="primary"
                style={{
                  textAlign: 'center',
                  margin: '0 auto',
                  paddingBottom: '1.5rem'
                }}
              >
                Surveys
              </Typography>
              {!isFetching && surveys.length === 0 && (
                <Typography
                  variant="h6"
                  style={{ maxWidth: '500px', margin: '0 auto' }}
                >
                  You don't seem to have launched any surveys yet! Make sure you
                  have some credits, then click the button on the bottom right
                  to get started.
                </Typography>
              )}
              <Grid container spacing={3} style={{ marginBottom: '12px' }}>
                {!isFetching && this.createSurveys()}
              </Grid>
            </Fragment>
          )}
        </Container>
      </Fragment>
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
