import { useMediaQuery } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MapIcon from '@material-ui/icons/Map';
import React, { useContext } from 'react';
import Context from '../context';
import Logout from './Auth/Logout';

const Header = ({ classes }) => {
  const {
    state: { currentUser }
  } = useContext(Context);
  const mobileSize = useMediaQuery('(max-width: 650px)');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.grow}>
            <MapIcon className={classes.icon} color="secondary" />
            <Typography
              className={mobileSize ? classes.mobile : ''}
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
            >
              React-Geo
            </Typography>
          </div>
          {currentUser && (
            <div className={classes.grow}>
              <img
                className={classes.picture}
                src={currentUser.picture}
                alt={`${currentUser.name} avatar`}
              />
              <Typography
                className={mobileSize ? classes.mobile : ''}
                variant="h5"
                color="inherit"
                noWrap
              >
                {currentUser.name}
              </Typography>
            </div>
          )}
          <Logout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: 45
  },
  mobile: {
    display: 'none'
  },
  picture: {
    height: '45px',
    borderRadius: '90%',
    marginRight: theme.spacing(2)
  }
});

export default withStyles(styles)(Header);
