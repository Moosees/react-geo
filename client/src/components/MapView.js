import { withStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import Context from '../context';
import { CREATE_DRAFT_PIN, UPDATE_DRAFT_PIN, GET_PINS } from '../types';
import { GET_PINS_QUERY } from '../graphql/queries';
import Blog from './Blog';
import PinIcon from './PinIcon';
import { useGraphql } from '../hooks/useGraphql';
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  latitude: 52.5686,
  longitude: 12.5387,
  zoom: 10
};

const MapView = ({ classes }) => {
  const { state, dispatch } = useContext(Context);
  const { client } = useGraphql();
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPos, setUserPos] = useState(null);

  useEffect(() => {
    const getPins = async () => {
      const { getPins } = await client.request(GET_PINS_QUERY);
      dispatch({ type: GET_PINS, payload: getPins });
    };
    if (client) {
      getPins();
    }
  }, [client, dispatch]);

  useEffect(() => {
    const getUserPosition = () => {
      if ('geolocation' in window.navigator) {
        window.navigator.geolocation.getCurrentPosition(
          pos => {
            const { latitude, longitude } = pos.coords;
            setViewport(prev => ({ ...prev, latitude, longitude }));
            setUserPos({ latitude, longitude });
          },
          err => {
            console.error(err);
          }
        );
      }
    };
    getUserPosition();
  }, []);

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: CREATE_DRAFT_PIN });
    }
    const [longitude, latitude] = lngLat;
    dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
  };

  return (
    <div className={classes.root}>
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        height="calc(100vh - 64px)"
        width="100vw"
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
        mapboxApiAccessToken="pk.eyJ1IjoibW9vc2VlcyIsImEiOiJjazJqaTA2cnQwdWwzM25tbGV3MmUyZDMyIn0.NXfml-n3t3OXiWg9P7WuWQ"
        {...viewport}
      >
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>
        {userPos && (
          <Marker
            longitude={userPos.longitude}
            latitude={userPos.latitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color={'#f00'} />
          </Marker>
        )}
        {state.draft && (
          <Marker
            longitude={state.draft.longitude}
            latitude={state.draft.latitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color={'#f0f'} />
          </Marker>
        )}
        {state.pins.map(pin => (
          <Marker
            key={pin._id}
            longitude={pin.longitude}
            latitude={pin.latitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color={'#03f'} />
          </Marker>
        ))}
      </ReactMapGL>
      <Blog />
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

export default withStyles(styles)(MapView);
