import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const authToken = localStorage.getItem('AuthToken');
  
  return (
    <Route
      {...rest}
      element={authToken ? element : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
