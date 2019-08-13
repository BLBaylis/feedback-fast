import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Grid } from '@material-ui/core';

const EmailCreation = () => {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Field
            required
            label="Survey Name"
            type="text"
            name="surveyName"
            placeholder="My Survey"
            component={TextField}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            label="Email Subject"
            type="text"
            name="surveySubject"
            placeholder="Tell us what you thought of our new feature!"
            component={TextField}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            multiline
            label="Email Body"
            component={TextField}
            name="surveyBody"
            rows={9}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EmailCreation;
