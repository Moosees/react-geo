import * as types from './types';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.LOGIN_USER:
      return {
        ...state,
        currentUser: payload.currentUser,
        googleUser: payload.googleUser
      };

    case types.LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
        googleUser: null
      };

    case types.CREATE_DRAFT_PIN:
      return {
        ...state,
        draft: {
          longitude: 0,
          latitude: 0
        }
      };

    case types.UPDATE_DRAFT_PIN:
      return {
        ...state,
        draft: {
          longitude: payload.longitude,
          latitude: payload.latitude
        }
      };

    case types.DISCARD_DRAFT_PIN:
      return {
        ...state,
        draft: null
      };

    case types.GET_PINS:
      return {
        ...state,
        pins: payload
      };

    case types.CREATE_PIN:
      const newPin = payload;
      const prevPins = state.pins.filter(pin => pin._id !== newPin._id);
      const newPins = [...prevPins, newPin];

      return {
        ...state,
        pins: newPins
      };

    default:
      return state;
  }
};

export default reducer;
