import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleToken } from '../actions';
import StripeCheckout from 'react-stripe-checkout';
import Button from '@material-ui/core/Button';

class StripePayments extends Component {
  render() {
    return (
      <StripeCheckout
        name={'FeedbackFast'}
        description={'Purchasing 5 credits for £5'}
        amount={500}
        token={this.props.handleToken} //token takes a callback to run once Stripe returns a token
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ ...this.props.style, color: '#fff' }}
        >
          Get Credits
        </Button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  { handleToken }
)(StripePayments);
