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

    default:
      return state;
  }
};

export default reducer;
