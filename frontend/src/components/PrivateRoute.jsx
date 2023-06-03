import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { routes } from '../utils/routes';

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { auth } = useSelector((state) => state.auth);

  return (
    auth ? children : <Navigate to={routes.signIn} state={{ from: location }} />
  );
};

export default PrivateRoute;
