import React from 'react';

import { ColorModeProvider } from './context/color-mode.context';
import combineComponents from './util/combine-components';
import NotificationContext from './context/notification.context';
import { ServiceContextProvider } from './context/service.context';

const providers = [
  ServiceContextProvider,
  ColorModeProvider,
  NotificationContext.Provider,
];

export default combineComponents(...providers);
