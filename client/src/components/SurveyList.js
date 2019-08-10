import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  createSurveys = surveys => {
    return surveys.reverse().map(({ title, yes, no, dateSent }) => {
      return (
        <div key={`${title}${dateSent}div`}>
          <h2 key={`${title}${dateSent}title`}>{title}</h2>
          <span
            style={{ margin: '10px' }}
            key={`${title}${dateSent}yes`}
          >{`yes: ${yes}`}</span>
          <span
            style={{ margin: '10px' }}
            key={`${title}${dateSent}no`}
          >{`no: ${no}`}</span>
          <span
            style={{ margin: '10px' }}
            key={`${title}${dateSent}total`}
          >{`total: ${yes + no}`}</span>
          <p key={`${title}${dateSent}date`}>{`Sent: ${new Date(
            dateSent
          ).toLocaleDateString()}`}</p>
        </div>
      );
    });
  };

  render() {
    const { surveys } = this.props;
    return (
      <div>
        <h1>Previous Surveys</h1>
        {this.createSurveys(surveys)}
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => ({ surveys });

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
