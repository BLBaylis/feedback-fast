import React from 'react';
import { v4 } from 'uuid';

const CenteredStatusIndicator = ({ children }) => {
  const noStatusToShow = !children.some(child => Boolean(child));
  console.log(children);
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
          <h1 style={headingStyles} key={v4()}>
            {child}
          </h1>
        );
      })}
    </div>
  );
};

export default CenteredStatusIndicator;
