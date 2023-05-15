import * as React from 'react';
import Routing from './routing';
import ContextWrapper from './context/context-wrapper';

export default function CrudApp({ Config }) {
  return (
    <ContextWrapper>
      <Routing />
      <Config />
    </ContextWrapper>
  );
}
