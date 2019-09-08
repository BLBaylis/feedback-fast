/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Paper,
  FormControl,
  Input,
  MenuItem,
  Select,
  useMediaQuery
} from '@material-ui/core';

import CenteredStatusIndicator from '../CenteredStatusIndicator';
import { getRecipients, getIsFetching, getError } from '../../reducers';
import { fetchRecipients } from '../../actions';

const RecipientsList = ({
  surveyId,
  fetchRecipients,
  recipients,
  isFetching,
  error
}) => {
  const [currPage, setCurrPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    (async () => await fetchRecipients(surveyId))();
  }, [fetchRecipients, surveyId]);

  const handleSubmit = event => event.preventDefault();

  const handleChange = ({ target }) => {
    if (target.name === 'currPage') {
      return setCurrPage(+target.value);
    }
    const firstPageItemIndex = (currPage - 1) * itemsPerPage;
    const newItemsPerPage = +target.value;
    const newPageNum = Math.floor(firstPageItemIndex / newItemsPerPage) + 1;
    setCurrPage(newPageNum);
    setItemsPerPage(newItemsPerPage);
  };

  const renderRecipients = () => {
    const recipientsToDisplay = recipients.slice(
      (currPage - 1) * itemsPerPage,
      currPage * itemsPerPage
    );
    return recipientsToDisplay.map(recipient => (
      <Grid
        item
        xs={12}
        sm={4}
        md={2}
        key={`${recipient.id}-grid`}
        component="li"
        css={{
          padding: '10px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}
      >
        {recipient.email}
      </Grid>
    ));
  };

  const getPageDisplay = () => {
    const firstItemIndex = (currPage - 1) * itemsPerPage + 1;
    const remainingItems = recipients.length - firstItemIndex;
    if (remainingItems < itemsPerPage) {
      return `${firstItemIndex} - ${firstItemIndex + remainingItems - 1}`;
    } else {
      return `${firstItemIndex} - ${firstItemIndex + itemsPerPage - 1}`;
    }
  };

  const numOfPages = Math.ceil(recipients.length / itemsPerPage) || 1;
  const Wrapper = isMobile ? 'div' : Paper;
  return (
    <Wrapper
      style={{
        padding: '1.5rem',
        marginBottom: '1.5rem',
        position: 'relative'
      }}
    >
      <CenteredStatusIndicator variant="h5">
        {isFetching ? 'Loading Recipient Details...' : null}
        {!error.status && !recipients.length && !isFetching
          ? 'Unable to find survey'
          : null}
        {error.status && !recipients.length && !isFetching
          ? 'Something went wrong!'
          : null}
      </CenteredStatusIndicator>
      {!isFetching && recipients.length && (
        <Fragment>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span
              css={{ margin: '0 1.5rem 1.5rem 0' }}
            >{`Displaying ${getPageDisplay()} out of ${
              recipients.length
            }`}</span>
            <form onSubmit={handleSubmit}>
              <FormControl css={{ margin: '0 1.5rem 1.5rem 0' }}>
                <Select
                  value={itemsPerPage}
                  onChange={handleChange}
                  input={<Input name="itemsPerPage" id="itemsPerPage" />}
                  name="itemsPerPage"
                >
                  <MenuItem value={10}>{`Show ${10} items per page`}</MenuItem>
                  <MenuItem value={50}>{`Show ${50} items per page`}</MenuItem>
                  <MenuItem
                    value={100}
                  >{`Show ${100} items per page`}</MenuItem>
                  <MenuItem
                    value={500}
                  >{`Show ${500} items per page`}</MenuItem>
                  <MenuItem
                    value={1000}
                  >{`Show ${1000} items per page`}</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                css={{
                  marginBottom: '1.5rem'
                }}
              >
                <Select
                  value={currPage}
                  onChange={handleChange}
                  input={<Input name="currPage" id="currPage" />}
                  displayEmpty
                  name="currPage"
                >
                  {Array(numOfPages)
                    .fill(null)
                    .map((curr, index) => {
                      return (
                        <MenuItem
                          key={`pageNumSelect${index + 1}`}
                          value={index + 1}
                        >{`Page ${index + 1}`}</MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </form>
          </div>
          <Grid
            container
            component="ul"
            style={{ listStyle: 'none', padding: 0, margin: '2rem 0' }}
          >
            {renderRecipients()}
          </Grid>
          <div
            style={{
              margin: '1rem',
              textAlign: 'center'
            }}
          ></div>
        </Fragment>
      )}
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  recipients: getRecipients(state),
  isFetching: getIsFetching(state, 'recipients'),
  error: getError(state, 'recipients')
});

export default connect(
  mapStateToProps,
  { fetchRecipients }
)(RecipientsList);
