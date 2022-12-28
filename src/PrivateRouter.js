import React from 'react';
import { Navigate, Outlet } from 'react-router';

const PrivateRouter = () => {
  const token = window.localStorage.getItem('userInfo');

  return token ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRouter;
