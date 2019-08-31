import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Paper,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';

import { fetchRecipients } from '../../actions';

class RecipientsList extends Component {
  state = {
    currPage: 1,
    recipientsFetched: false,
    itemsPerPage: 10,
    allItemsAreDisplayed: false
  };

  async componentDidMount() {
    const { itemsPerPage } = this.state;
    await this.props.fetchRecipients(this.props.surveyId);
    this.setState({
      allItemsAreDisplayed: this.areAllItemsAreDisplayed(itemsPerPage)
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(event);
  };

  changePage = pageNum => () => {
    this.setState({ currPage: pageNum });
  };

  handleChange = (event, itemsPerPage) => {
    this.setState({
      itemsPerPage: +event.target.value,
      allItemsAreDisplayed: this.areAllItemsAreDisplayed(itemsPerPage)
    });
  };

  areAllItemsAreDisplayed = itemsPerPage => {
    return this.props.recipients.length < itemsPerPage ? true : false;
  };

  showMoreRecipients = itemsPerPage => () => {
    this.setState({
      sectionsToShow: this.state.sectionsToShow + 1,
      allItemsAreDisplayed: this.areAllItemsAreDisplayed(itemsPerPage)
    });
  };

  renderRecipients = itemsPerPage => {
    const { recipients } = this.props;
    if (recipients.length < itemsPerPage) {
      var recipientsToDisplay = recipients;
    }
    recipientsToDisplay = recipients.slice(0, itemsPerPage);
    return recipientsToDisplay.map(recipient => (
      <Grid
        item
        xs={4}
        key={`${recipient._id}-grid`}
        component="li"
        style={{ textAlign: 'center', padding: '5px 0' }}
      >
        {recipient.email}
      </Grid>
    ));
  };

  getPageDisplay = (recipientsLength, itemsPerPage, currPage) => {
    const firstItemIndex = (currPage - 1) * itemsPerPage + 1;
    const remainingItems = recipientsLength - firstItemIndex;
    if (remainingItems < itemsPerPage) {
      return `${firstItemIndex} - ${firstItemIndex + remainingItems}`;
    } else {
      return `${firstItemIndex} - ${firstItemIndex + itemsPerPage}`;
    }
  };

  render() {
    const { itemsPerPage, currPage } = this.state;
    const recipientsLength = this.props.recipients.length;
    const numOfPages = Math.ceil(recipientsLength / itemsPerPage);
    return (
      <Paper style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{`Displaying ${this.getPageDisplay(
            recipientsLength,
            itemsPerPage,
            currPage
          )} out of ${recipientsLength}`}</span>
          <form onSubmit={this.handleSubmit}>
            <FormControl>
              <Select
                value={itemsPerPage}
                onChange={event => this.handleChange(event, itemsPerPage)}
                input={<Input name="itemsPerPage" id="itemsPerPage" />}
                displayEmpty
                name="itemsPerPage"
              >
                <MenuItem value={10}>{`Show ${10} items per page`}</MenuItem>
                <MenuItem value={50}>{`Show ${50} items per page`}</MenuItem>
                <MenuItem value={100}>{`Show ${100} items per page`}</MenuItem>
                <MenuItem value={500}>{`Show ${500} items per page`}</MenuItem>
                <MenuItem
                  value={1000}
                >{`Show ${1000} items per page`}</MenuItem>
              </Select>
            </FormControl>
          </form>
        </div>
        {recipientsLength && (
          <Grid
            container
            component="ul"
            style={{ listStyle: 'none', padding: 0, margin: '2rem 0' }}
          >
            {this.renderRecipients(itemsPerPage)}
          </Grid>
        )}
        <div
          style={{
            margin: '1rem',
            textAlign: 'center'
          }}
        >
          {Array(numOfPages)
            .fill(null)
            .map((curr, index) => {
              return (
                <Button
                  variant="outlined"
                  key={`page-${index + 1}-btn`}
                  onClick={this.changePage(index + 1)}
                >
                  {`${index + 1}`}
                </Button>
              );
            })}
        </div>
      </Paper>
    );
  }
}

export default connect(
  ({ recipients }) => ({ recipients }),
  { fetchRecipients }
)(RecipientsList);
