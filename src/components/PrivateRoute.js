import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { retToken } from '../AuthToken';

const PrivateRoute = ({ element, ...rest }) => {
  const authToken = localStorage.getItem('AuthToken');

  return (
    <Route
      {...rest}
      element={authToken ? element : <Navigate to="/not-authenticated" />}
    />
  );
};

export default PrivateRoute;
