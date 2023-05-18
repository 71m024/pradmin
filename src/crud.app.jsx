import * as React from 'react';
import Routing from './routing';
import ContextWrapper from './context/context-wrapper';

export default function CrudApp({ Config }) {
  const { Color, routes } = Config;
  return (
    <ContextWrapper>
      <Routing routes={routes} />
      <Color />
    </ContextWrapper>
  );
}
