import * as React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../service/auth.service';

export default function Logout() {
  AuthService.logout();
  return <Navigate push to="/" />;
}
