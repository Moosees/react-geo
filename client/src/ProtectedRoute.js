import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from './context';

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(Context);
  if (!state.googleUser) {
    return <Redirect to="/login" />;
  } else if (
    typeof state.googleUser.isSignedIn === 'function' &&
    state.googleUser.isSignedIn()
  ) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoute;
