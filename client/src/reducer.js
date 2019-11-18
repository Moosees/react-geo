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

    default:
      return state;
  }
};

export default reducer;
