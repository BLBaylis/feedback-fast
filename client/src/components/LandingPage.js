/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { getUser, getIsFetching, getError } from '../reducers';
import {
  Link as MuiLink,
  Button,
  Container,
  Typography
} from '@material-ui/core';
import Logo from './Logo';

const LandingPage = ({ user }) => {
  return (
    <Fragment>
      <div className="img-container"></div>
      <Container
        className="content-container"
        css={{
          '&&': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            position: 'relative',
            width: '100%',
            '@media (min-width: 1024px)': {
              width: '50%',
              margin: '0 0 0 auto',
              height: '100%',
              background: 'none'
            }
          }
        }}
      >
        <div
          css={{
            position: 'relative',
            top: '2.5%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '95%',
            '@media (min-width : 1024px)': {
              top: 0
            }
          }}
        >
          <Typography
            variant="h2"
            css={{
              '&&': {
                color: ' #fff',
                textAlign: 'center',
                '@media (max-width: 1023px)': {
                  fontSize: ' 2.5rem'
                }
              }
            }}
          >
            Knowledge is power
          </Typography>
          <Typography
            variant="h6"
            style={{
              marginTop: '30px',
              color: '#fff',
              textAlign: 'center',
              maxWidth: '400px'
            }}
          >
            Get that crucial data you need to push your business in the right
            direction with our quick and easy marketing surveys
          </Typography>
          <div
            style={{
              marginTop: '30px',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '400px'
            }}
          >
            <Button
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                margin: '0 10px'
              }}
              color="secondary"
              size="large"
              variant="contained"
              component={RouterLink}
              to="/register"
            >
              Sign up
            </Button>
            <Button
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                margin: '0 10px'
              }}
              color="secondary"
              size="large"
              variant="contained"
              component={RouterLink}
              to="/login"
            >
              Log in
            </Button>
          </div>

          {user && <Redirect to="/dashboard/surveys" />}
        </div>
      </Container>
      <div
        css={{
          position: 'absolute',
          width: '100%',
          top: 0,
          //background: 'steelblue',
          '@media (min-width: 1024px)': {
            background: 'none'
          }
        }}
      >
        <MuiLink
          component={RouterLink}
          to={user ? '/dashboard/surveys' : '/'}
          css={{
            '&&': {
              paddingTop: '0.5rem',
              display: 'inline-block',
              maxWidth: '100%'
            }
          }}
        >
          <Logo
            style={{
              svg: {
                '&&': {
                  height: '60px',
                  width: 'auto',
                  '@media (min-width : 1024px)': {
                    height: '60px'
                  }
                }
              },
              icon: {
                fill: '#f50057'
              }
            }}
          />
        </MuiLink>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: getUser(state),
  isFetching: getIsFetching(state, 'user'),
  error: getError(state, 'user')
});

export default connect(
  mapStateToProps,
  null
)(LandingPage);
