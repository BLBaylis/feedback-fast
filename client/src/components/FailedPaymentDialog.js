import React, { Component } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

class FailedPaymentDialog extends Component {
  state = {
    open: true
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const open = this.state.open;
    const error = this.props.error.raw;
    const { code, message } = error;
    const errorTitle = code
      .split('_')
      .map(word => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(' ');
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{errorTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Sorry, payment couldn't be completed. ${message}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div style={{ padding: '8px 16px' }}>
            <Button
              variant="contained"
              onClick={this.handleClose}
              color="primary"
              autoFocus
            >
              Return
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    );
  }
}

export default FailedPaymentDialog;
