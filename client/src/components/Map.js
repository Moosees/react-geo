import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  latitude: 52.5686,
  longitude: 12.5387,
  zoom: 3
};

const Map = ({ classes }) => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  return (
    <div className={classes.root}>
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        height="calc(100vh - 64px)"
        width="100vw"
        onViewportChange={newViewport => setViewport(newViewport)}
        mapboxApiAccessToken="pk.eyJ1IjoibW9vc2VlcyIsImEiOiJjazJqaTA2cnQwdWwzM25tbGV3MmUyZDMyIn0.NXfml-n3t3OXiWg9P7WuWQ"
        {...viewport}
      >
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>
      </ReactMapGL>
    </div>
  );
};

const styles = {
  root: {
    display: 'flex'
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  navigationControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: '1em'
  },
  deleteIcon: {
    color: 'red'
  },
  popupImage: {
    padding: '0.4em',
    height: 200,
    width: 200,
    objectFit: 'cover'
  },
  popupTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
};

export default withStyles(styles)(Map);
