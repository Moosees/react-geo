import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from './context';

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(Context);
  if (state.isSignedIn) {
    return children;
  } else {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoute;
