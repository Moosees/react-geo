import { useMediaQuery } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import { differenceInMinutes } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { Subscription } from 'react-apollo';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import Context from '../context';
import { DELETE_PIN_MUTATION } from '../graphql/mutations';
import { GET_PINS_QUERY } from '../graphql/queries';
// prettier-ignore
import { PIN_ADDED_SUBSCRIPTION, PIN_DELETED_SUBSCRIPTION, PIN_UPDATED_SUBSCRIPTION } from '../graphql/subscriptions';
import { useGraphql } from '../hooks/useGraphql';
// prettier-ignore
import { CREATE_COMMENT, CREATE_DRAFT_PIN, CREATE_PIN, DELETE_PIN, GET_PINS, SET_PIN, UPDATE_DRAFT_PIN } from '../types';
import Blog from './Blog';
import PinIcon from './PinIcon';

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
  const [popup, setPopup] = useState(null);
  const mobileSize = useMediaQuery('(max-width: 650px)');

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

  useEffect(() => {
    const pinExists =
      pupup && state.pins.findIndex(pin => pin._id === popup._id) > -1;
    if (!pinExists) {
      setPopup(null);
    }
  }, [state.pins.length]);

  const highlightNewPin = pin => {
    const isNewPin =
      differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 60;

    return isNewPin ? '#09f' : '#03f';
  };

  const isAuthUser = () => state.currentUser._id === popup.author._id;

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: CREATE_DRAFT_PIN });
    }
    setPopup(null);
    const [longitude, latitude] = lngLat;
    dispatch({ type: UPDATE_DRAFT_PIN, payload: { longitude, latitude } });
  };

  const handlePinClick = pin => {
    setPopup(pin);
    dispatch({ type: SET_PIN, payload: pin });
  };

  const handleDeletePin = async pin => {
    const variables = { pinId: pin._id };
    await client.request(DELETE_PIN_MUTATION, variables);
    setPopup(null);
  };

  return (
    <div className={mobileSize ? classes.rootMobile : classes.root}>
      <div className={mobileSize ? classes.mapMobile : classes.map}>
        <ReactMapGL
          {...viewport}
          height="100%"
          width="100%"
          mapStyle="mapbox://styles/mapbox/outdoors-v11"
          scrollZoom={!mobileSize}
          onViewportChange={newViewport => setViewport(newViewport)}
          onClick={handleMapClick}
          mapboxApiAccessToken="pk.eyJ1IjoibW9vc2VlcyIsImEiOiJjazJqaTA2cnQwdWwzM25tbGV3MmUyZDMyIn0.NXfml-n3t3OXiWg9P7WuWQ"
        >
          <div className={classes.navigationControl}>
            <NavigationControl
              onViewportChange={newViewport => setViewport(newViewport)}
            />
          </div>
          {/* Current user location pin */}
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
          {/* Pin drafts */}
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
          {/* Saved map pins */}
          {state.pins.map(pin => (
            <Marker
              key={pin._id}
              longitude={pin.longitude}
              latitude={pin.latitude}
              offsetLeft={-19}
              offsetTop={-37}
            >
              <PinIcon
                size={40}
                color={highlightNewPin(pin)}
                onClick={() => handlePinClick(pin)}
              />
            </Marker>
          ))}
          {/* Selected pin popup */}
          {popup && (
            <Popup
              anchor="top"
              longitude={popup.longitude}
              latitude={popup.latitude}
              closeOnClick={false}
              onClose={() => setPopup(null)}
            >
              <img
                className={classes.popupImage}
                src={popup.image}
                alt={popup.title}
              />
              <div className={classes.popupTab}>
                <Typography>
                  {popup.latitude.toFixed(6)}, {popup.longitude.toFixed(6)}
                </Typography>
                {isAuthUser() && (
                  <Button onClick={() => handleDeletePin(popup)}>
                    <DeleteIcon className={classes.deleteIcon} />
                  </Button>
                )}
              </div>
            </Popup>
          )}
        </ReactMapGL>
      </div>
      <Blog />
      {/* graphql subscriptions */}
      <Subscription
        subscription={PIN_ADDED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinAdded } = subscriptionData.data;
          dispatch({ type: CREATE_PIN, payload: pinAdded });
        }}
      />
      <Subscription
        subscription={PIN_DELETED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinDeleted } = subscriptionData.data;
          dispatch({ type: DELETE_PIN, payload: pinDeleted });
        }}
      />
      <Subscription
        subscription={PIN_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinUpdated } = subscriptionData.data;
          dispatch({ type: CREATE_COMMENT, payload: pinUpdated });
        }}
      />
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
  map: {
    height: 'calc(100vh - 64px)',
    width: '100vw'
  },
  mapMobile: {
    height: 'calc(100vh - 306px)',
    width: '100vw'
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
