import React from 'react';
import { MobileStepper as Stepper, Button } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';

const MobileStepper = ({ activeStep, handleStep, nextButton, style }) => {
  return (
    <Stepper
      style={style}
      variant="dots"
      steps={3}
      position="static"
      activeStep={activeStep}
      nextButton={nextButton}
      backButton={
        <Button
          size="small"
          onClick={handleStep(activeStep - 1)}
          disabled={activeStep === 0}
        >
          <KeyboardArrowLeft />
          Back
        </Button>
      }
    />
  );
};

export default MobileStepper;
