import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Container,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionLessPanel from '../ExpansionlessPanel';

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
    expandedPanel: false
  };

  componentDidMount() {
    if (!this.props.survey) {
      this.props.fetchSurveys();
    }
  }

  handleClick = panel => () => {
    this.setState(({ expandedPanel }) => {
      const nextState = expandedPanel === panel ? false : panel;
      return { expandedPanel: nextState };
    });
  };

  render() {
    if (this.props.survey) {
      var {
        yes,
        no,
        title,
        dateSent,
        lastResponded,
        body,
        subject,
        id
      } = this.props.survey;
      var formattedDateSent = new Date(dateSent).toLocaleDateString();
      var formattedLastResponded = !lastResponded
        ? 'No responses yet!'
        : new Date(lastResponded).toLocaleDateString();
    }
    const classes = this.props.classes;
    const expanded = this.state.expandedPanel;
    console.log(this.props.survey);
    return (
      <Container>
        {this.props.survey && (
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
              expanded={expanded === 'panel1'}
              onChange={this.handleClick('panel1')}
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
              expanded={expanded === 'panel2'}
              onChange={this.handleClick('panel2')}
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
                <Typography variant="body2" color="textSecondary">
                  {subject}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>{subject}</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel3'}
              onChange={this.handleClick('panel3')}
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
                <Typography variant="body2" color="textSecondary">
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
          </div>
        )}
        {this.props.survey === undefined && <h1>Fetching survey...</h1>}
        {this.props.survey === false && <h1>Invalid survey id</h1>}
      </Container>
    );
  }
}

const mapStateToProps = ({ surveys }, ownProps) => {
  let survey;
  if (!surveys.length) {
    return { survey: undefined };
  }
  survey = surveys.find(survey => survey._id === ownProps.match.params.id);
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
  { fetchSurveys }
)(StyledSurveyDetails);
