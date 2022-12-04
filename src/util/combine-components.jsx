import React from 'react';

const combineComponents = (...components) => {
  const Context = components.reduce(
    (AccumulatedComponents, CurrentComponent) => function ({ children }) {
      return (
        <AccumulatedComponents>
          <CurrentComponent>{children}</CurrentComponent>
        </AccumulatedComponents>
      );
    },
    ({ children }) => children,
  );
  return <Context />;
};

export default combineComponents;
