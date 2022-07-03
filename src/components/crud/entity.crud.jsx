import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import MiniDrawer from '../mini-drawer';
import StatusSnackbar from '../status-snackbar';

export default function EntityCrud({ listComponent, newComponent, editComponent }) {
  return (
    <>
      <MiniDrawer />
      <StatusSnackbar />
      <Routes>
        <Route
          index
          element={listComponent}
        />
        <Route
          path="new"
          element={newComponent}
        />
        <Route
          path=":id"
          element={editComponent}
        />
      </Routes>
    </>
  );
}
