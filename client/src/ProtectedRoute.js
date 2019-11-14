import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from './context';

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(Context);
  return state.isAuth ? children : <Redirect to="/login" />;
};

export default ProtectedRoute;
