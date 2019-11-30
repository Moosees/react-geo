import { Paper, useMediaQuery } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import Context from '../context';
import CreatePin from './Pin/CreatePin';
import NoContent from './Pin/NoContent';
import PinContent from './Pin/PinContent';

const Blog = ({ classes }) => {
  const { state } = useContext(Context);
  const { draft, currentPin } = state;
  const mobileSize = useMediaQuery('(max-width: 650px)');

  let BlogContent;
  if (!draft && !currentPin) {
    BlogContent = NoContent;
  } else if (draft && !currentPin) {
    BlogContent = CreatePin;
  } else if (currentPin && !draft) {
    BlogContent = PinContent;
  } else {
    BlogContent = null;
  }

  return (
    <Paper className={mobileSize ? classes.rootMobile : classes.root}>
      <BlogContent />
    </Paper>
  );
};

const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: 'calc(100vh - 64px)',
    overflowY: 'scroll',
    display: 'flex',
    justifyContent: 'center'
  },
  rootMobile: {
    maxWidth: '100%',
    height: 250,
    overflowX: 'hidden',
    overflowY: 'scroll'
  }
};

export default withStyles(styles)(Blog);
