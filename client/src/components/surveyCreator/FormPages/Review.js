/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

const Review = ({ formProps }) => {
  const labels = ['Survey Name', 'Subject', 'Body', 'Recipients'];
  const values = Object.values(formProps.values);
  return (
    <Fragment>
      <Typography
        css={{ paddingTop: '1rem' }}
        component="h1"
        variant="h4"
        align="center"
      >
        Review
      </Typography>
      <List>
        {values.map((listItem, index) => {
          return (
            <ListItem key={labels[index]}>
              <ListItemText
                css={{ wordWrap: 'break-word' }}
                primary={labels[index]}
                secondary={listItem}
              />
            </ListItem>
          );
        })}
      </List>
      <div css={{ height: '48px' }}></div>
    </Fragment>
  );
};

export default Review;
