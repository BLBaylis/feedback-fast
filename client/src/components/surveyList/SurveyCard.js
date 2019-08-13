import React from 'react';
import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions
} from '@material-ui/core';

const tallyStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
};

const yesTally = {
  ...tallyStyles,
  background: '#f2faf6',
  color: '#00a651'
};
const noTally = {
  ...tallyStyles,
  background: '#feeff0',
  color: '#dc3545'
};

const totalTally = {
  ...tallyStyles,
  background: '#e3e7fc',
  color: '#3f51b5'
};

const SurveyCard = ({ title, dateSent, yes, no }, id) => {
  return (
    <Card
      key={`${title}${dateSent}card${id}`}
      style={{
        display: 'flex',
        height: '200px'
      }}
    >
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
          flex: '1 1 auto',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          key={`${title}${dateSent}title${id}`}
        >
          {title}
        </Typography>
        <Typography
          color="textSecondary"
          key={`${title}${dateSent}date${id}`}
        >{`Sent: ${new Date(dateSent).toLocaleDateString()}`}</Typography>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button color="primary" variant="outlined">
            More Info
          </Button>
        </CardActions>
      </CardContent>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          width: '100px',
          marginLeft: 'auto'
        }}
      >
        <span
          style={yesTally}
          key={`${title}${dateSent}yes${id}`}
        >{`Yes: ${yes}`}</span>
        <span
          style={noTally}
          key={`${title}${dateSent}no${id}`}
        >{`No: ${no}`}</span>
        <span
          style={totalTally}
          color="primary"
          key={`${title}${dateSent}total${id}`}
        >{`Total: ${yes + no}`}</span>
      </div>
    </Card>
  );
};

export default SurveyCard;
