import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

const Review = ({ checkFieldIsValidated, formProps, updatePage }) => {
  const labels = ['Survey Name', 'Subject', 'Body', 'Recipients'];
  const values = Object.values(formProps.values);
  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Review
      </Typography>
      <List>
        {values.map((listItem, index) => {
          return (
            <ListItem key={labels[index]}>
              <ListItemText primary={labels[index]} secondary={listItem} />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
};

export default Review;
