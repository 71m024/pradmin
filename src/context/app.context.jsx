import { BrowserRouter } from 'react-router-dom';
import { ColorModeProvider } from './color-mode.context';
import combineComponents from '../util/combine-components';
import { NotificationProvider } from './notification.context';
import { ServiceContextProvider } from './service.context';
import RoutingProvider from './routing.context';

export default () => combineComponents(
  BrowserRouter,
  RoutingProvider,
  ServiceContextProvider,
  ColorModeProvider,
);
