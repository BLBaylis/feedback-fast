import React from 'react';
import { v4 } from 'uuid';
import { Typography } from '@material-ui/core';

const CenteredStatusIndicator = ({ children, variant }) => {
  const noStatusToShow = !children.some(child => Boolean(child));
  const headingStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 0
  };
  if (noStatusToShow) {
    return null;
  }
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        top: 'calc(-36px - 2rem)'
      }}
    >
      {React.Children.map(children, child => {
        if (!child) {
          return null;
        }
        return (
          <Typography
            variant={variant || 'h3'}
            style={headingStyles}
            key={v4()}
          >
            {child}
          </Typography>
        );
      })}
    </div>
  );
};

export default CenteredStatusIndicator;
