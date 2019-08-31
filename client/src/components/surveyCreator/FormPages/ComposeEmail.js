/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Grid } from '@material-ui/core';

const ComposeEmail = ({ isMobile }) => {
  return (
    <div
      css={{
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        '@media (min-height: 450px) and (max-width: 650px)': {
          alignItems: 'center'
        },
        '@media (min-width: 650px)': {
          display: 'initial'
        }
      }}
    >
      <div
        css={{
          '@media (min-height: 450px) and (max-width: 650px)': {
            position: 'relative',
            top: 'calc(-18px - 1rem)'
          },
          '@media (min-width: 650px)': {
            position: 'static'
          }
        }}
      >
        <Grid container spacing={3} css={{ margin: ' 0 -12px' }}>
          <Grid item xs={12}>
            <Field
              required
              label="Survey Name"
              type="text"
              name="name"
              placeholder="My Survey"
              component={TextField}
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              required
              label="Email Subject"
              type="text"
              name="subject"
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
              name="body"
              rows={isMobile ? 7 : 9}
              fullWidth
            />
          </Grid>
        </Grid>
        <div
          css={{ height: '48px', '@media (min-height: 450px)': { height: 0 } }}
        ></div>
      </div>
    </div>
  );
};

export default ComposeEmail;
