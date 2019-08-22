import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { fetchSurveys } from '../../actions';
import SurveyCard from './SurveyCard';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  createSurveys = surveys => {
    return surveys.reverse().map((props, index) => {
      const { title } = props;
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={`${title}grid-${index}`}>
          <SurveyCard {...props} />
        </Grid>
      );
    });
  };

  render() {
    const { surveys } = this.props;
    console.log(surveys);
    return (
      <Fragment>
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
          variant="h3"
          component="h1"
          text="primary"
          style={{ textAlign: 'center', margin: '1.5rem auto' }}
        >
          Surveys
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ marginBottom: '12px' } /*spacing * 4px*/}
        >
          {this.createSurveys(surveys)}
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ surveys }) => ({ surveys });

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
