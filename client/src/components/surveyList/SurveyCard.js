import React from 'react';
import { Card } from '@material-ui/core';

const SurveyCard = ({ title, dateSent, yes, no }) => {
  return (
    <Card key={`${title}${dateSent}card`}>
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
    </Card>
  );
};

export default SurveyCard;
