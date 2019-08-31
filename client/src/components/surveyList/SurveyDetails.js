import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Container,
  Typography,
  Button
} from '@material-ui/core';
import { fetchSurveys, deleteSurvey } from '../../actions';
import DeleteDialog from './DeleteDialog';
import ExpansionLessPanel from '../ExpansionlessPanel';
import RecipientsList from './RecipientsList';

const styles = {
  heading: {
    flex: '0 0 33.33%'
  },
  secondaryHeading: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '66.66%'
  },
  title: {
    margin: '1.5rem auto'
  }
};

const materialStyles = {
  content: {
    width: 'calc(100% - 48px)'
  }
};

class SurveyDetails extends Component {
  state = {
    expandedPanel: false,
    showRecipientsList: false,
    deleteAttempted: false,
    deleted: false
  };

  componentDidMount() {
    this.props.fetchSurveys();
  }

  handleDelete = surveyId => async () => {
    const deleteWasSuccessful = await this.props.deleteSurvey(surveyId);
    if (!deleteWasSuccessful) {
      return this.setState({ deleteAttempted: true });
    }
    this.setState({ deleteAttempted: true, deleted: true });
  };

  handlePanelClick = panel => () => {
    this.setState(({ expandedPanel }) => {
      const nextState = expandedPanel === panel ? false : panel;
      return { expandedPanel: nextState };
    });
  };

  handleButtonClick = surveyId => async () => {
    await this.props.fetchRecipients(surveyId);
    this.setState({ recipientsFetched: true });
  };

  render() {
    const { survey, classes } = this.props;
    const {
      expandedPanel,
      deleted,
      deleteAttempted,
      showRecipientsList
    } = this.state;

    if (survey) {
      var {
        yes,
        no,
        title,
        dateSent,
        lastResponded,
        body,
        subject,
        id
      } = survey;
      var formattedDateSent = new Date(dateSent).toLocaleDateString();
      var formattedLastResponded = !lastResponded
        ? 'No responses yet!'
        : new Date(lastResponded).toLocaleDateString();
    }
    return (
      <Container>
        {survey && !deleted && (
          <div>
            <Typography
              style={styles.title}
              variant="h4"
              align="center"
              key={`${id}-title`}
            >
              Details of {title}
            </Typography>
            <ExpansionPanel
              expanded={expandedPanel === 'panel1'}
              onChange={this.handlePanelClick('panel1')}
            >
              <ExpansionPanelSummary
                classes={{ content: classes.content }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="body2" style={styles.heading}>
                  Title
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={styles.secondaryHeading}
                >
                  {title}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>{title}</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expandedPanel === 'panel2'}
              onChange={this.handlePanelClick('panel2')}
            >
              <ExpansionPanelSummary
                classes={{ content: classes.content }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography variant="body2" style={styles.heading}>
                  Subject
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={styles.secondaryHeading}
                >
                  {subject}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>{subject}</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expandedPanel === 'panel3'}
              onChange={this.handlePanelClick('panel3')}
            >
              <ExpansionPanelSummary
                classes={{ content: classes.content }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography variant="body2" style={styles.heading}>
                  Body
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={styles.secondaryHeading}
                >
                  {body}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>{body}</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionLessPanel name="Date Sent" value={formattedDateSent} />
            <ExpansionLessPanel
              name="Last Responded"
              value={formattedLastResponded}
            />
            <ExpansionLessPanel name="Yes" value={yes} />
            <ExpansionLessPanel name="No" value={no} />
            <ExpansionLessPanel name="Total" value={yes + no} />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {!this.state.showRecipientsList && (
                <Button
                  style={{ margin: '15px 0 15px 15px' }}
                  variant="outlined"
                  onClick={() => this.setState({ showRecipientsList: true })}
                >
                  Get recipients
                </Button>
              )}
              <DeleteDialog handleDelete={this.handleDelete(survey._id)} />
            </div>
          </div>
        )}

        {survey === null && <h1>Fetching survey...</h1>}
        {survey === false && <h1>Invalid survey ID</h1>}
        {deleteAttempted && !deleted && (
          <h1>Deletion unsuccessful. Try again later!</h1>
        )}
        {showRecipientsList && (
          <RecipientsList surveyId={survey._id}></RecipientsList>
        )}
        {deleted && (
          <Fragment>
            <h1>Survey deleted</h1>
            <Button component={RouterLink} to="/dashboard/surveys">
              Back to Surveys
            </Button>
          </Fragment>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ surveys }, ownProps) => {
  if (!surveys.length) {
    return { survey: null };
  }
  const survey = surveys.find(
    survey => survey._id === ownProps.match.params.id
  );
  if (!survey) {
    return { survey: false };
  }
  return {
    survey
  };
};

const StyledSurveyDetails = withStyles(materialStyles)(SurveyDetails);

export default connect(
  mapStateToProps,
  { fetchSurveys, deleteSurvey }
)(StyledSurveyDetails);
