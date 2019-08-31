import React from 'react';
import { Stepper as MuiStepper, StepLabel, Step } from '@material-ui/core';

const Stepper = ({ steps, activeStep }) => {
  return (
    <MuiStepper activeStep={activeStep}>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
};

export default Stepper;
