import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import StatusSnackbar from '../status-snackbar';

export default function EntityCrud({
  listComponent, newComponent, editComponent, drawer,
}) {
  return (
    <>
      {drawer}
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
