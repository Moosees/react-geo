import React from 'react';
import { GoogleLogout } from 'react-google-login';
import withRoot from '../withRoot';

const App = () => {
  return (
    <div>
      <GoogleLogout
        buttonText="Log out"
        clientId="979136694083-n0fs310alq1bf5a5dn53ahr3vsr2dpld.apps.googleusercontent.com"
      />
    </div>
  );
};

export default withRoot(App);
