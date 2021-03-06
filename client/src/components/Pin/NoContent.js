import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExploreIcon from '@material-ui/icons/Explore';
import React from 'react';

const NoContent = ({ classes }) => (
  <div className={classes.root}>
    <ExploreIcon className={classes.icon} />
    <Typography
      component="h2"
      variant="h6"
      align="center"
      color="textPrimary"
      noWrap
      gutterBottom
    >
      Click on the map to add a pin!
    </Typography>
  </div>
);

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    height: '100%'
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: '80px'
  }
});

export default withStyles(styles)(NoContent);
