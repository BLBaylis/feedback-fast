import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

class DeleteDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => {
    this.props.handleDelete();
    this.setState({ open: false });
  };

  render() {
    const open = this.state.open;
    return (
      <div>
        <Button
          style={{
            margin: '15px 0 15px 15px',
            backgroundColor: 'red',
            color: '#fff'
          }}
          variant="contained"
          onClick={this.handleOpen}
        >
          Delete Survey
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Survey</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this survey? This is a destructive
              action that cannot be undone!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} autoFocus>
              Back
            </Button>
            <Button
              style={{
                backgroundColor: 'red',
                color: '#fff'
              }}
              variant="contained"
              onClick={this.handleClose}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;
