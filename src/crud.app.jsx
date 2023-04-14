import * as React from 'react';
import Routing from './routing';
import ContextWrapper from './context/context-wrapper';

export default function CrudApp() {
  return (
    <ContextWrapper>
      <Routing />
    </ContextWrapper>
  );
}
