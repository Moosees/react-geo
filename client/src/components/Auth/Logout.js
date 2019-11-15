import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GoogleLogout } from 'react-google-login';
// import ExitToApp from '@material-ui/icons/ExitToApp';
// import Typography from '@material-ui/core/Typography';

const Logout = ({ classes }) => {
  return (
    <GoogleLogout
      buttonText="Log out"
      clientId="979136694083-n0fs310alq1bf5a5dn53ahr3vsr2dpld.apps.googleusercontent.com"
    />
  );
};

const styles = {
  root: {
    cursor: 'pointer',
    display: 'flex'
  },
  buttonText: {
    color: 'orange'
  },
  buttonIcon: {
    marginLeft: '5px',
    color: 'orange'
  }
};

export default withStyles(styles)(Logout);
