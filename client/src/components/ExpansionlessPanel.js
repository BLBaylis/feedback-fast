import React from 'react';
import { Typography, Paper } from '@material-ui/core';

const styles = {
  heading: {
    flex: '0 0 33.33%'
  },
  secondaryHeading: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '66.66%'
  }
};

const ExpansionlessPanel = ({ name, value }) => {
  return (
    <Paper className="MuiExpansionPanel-root MuiExpansionPanel-rounded">
      <div className="MuiButtonBase-root MuiExpansionPanelSummary-root">
        <div
          style={{ justifyContent: 'space-between' }}
          className="MuiExpansionPanelSummary-content"
        >
          <Typography variant="body2" style={styles.heading}>
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={styles.secondaryHeading}
          >
            {value}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default ExpansionlessPanel;
