import { useMediaQuery } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExitToApp from '@material-ui/icons/ExitToApp';
import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import Context from '../../context';
import { LOGOUT_USER } from '../../types';

const Logout = ({ classes }) => {
  const { dispatch } = useContext(Context);
  const mobileSize = useMediaQuery('(max-width: 650px)');

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <GoogleLogout
      onLogoutSuccess={handleLogout}
      clientId="979136694083-n0fs310alq1bf5a5dn53ahr3vsr2dpld.apps.googleusercontent.com"
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          {!mobileSize && (
            <Typography variant="body1" color="secondary">
              Log out
            </Typography>
          )}
          <ExitToApp className={classes.buttonIcon} color="secondary" />
        </span>
      )}
    />
  );
};

const styles = {
  root: {
    cursor: 'pointer',
    display: 'flex'
  },
  buttonIcon: {
    marginLeft: '5px'
  }
};

export default withStyles(styles)(Logout);
