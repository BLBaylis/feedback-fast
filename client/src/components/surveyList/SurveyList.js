import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
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
        <Grid item xs={4} key={`${title}grid-${index}`}>
          <SurveyCard {...props} />
        </Grid>
      );
    });
  };

  render() {
    const { surveys } = this.props;
    return (
      <Fragment>
        <h1>Previous Surveys</h1>
        <Grid container spacing={5}>
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
