import React from 'react';

const combineComponents = (...components) => components.reduce(
  (AccumulatedComponents, CurrentComponent) => function ({ children }) {
    return (
      <AccumulatedComponents>
        <CurrentComponent>{children}</CurrentComponent>
      </AccumulatedComponents>
    );
  },
  ({ children }) => <>{ children }</>,
);

export default combineComponents;
