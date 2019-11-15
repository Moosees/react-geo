import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GoogleLogout } from 'react-google-login';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import Context from '../../context';
import { LOGOUT_USER } from '../../types';

const Logout = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
  };

  return (
    <GoogleLogout
      onLogoutSuccess={handleLogout}
      clientId="979136694083-n0fs310alq1bf5a5dn53ahr3vsr2dpld.apps.googleusercontent.com"
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography variant="body1" className={classes.buttonText}>
            Log out
          </Typography>
          <ExitToApp className={classes.buttonIcon} />
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
  buttonText: {
    color: 'orange'
  },
  buttonIcon: {
    marginLeft: '5px',
    color: 'orange'
  }
};

export default withStyles(styles)(Logout);
