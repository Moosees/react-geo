import * as types from './types';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.LOGIN_USER:
      return {
        ...state,
        currentUser: payload
      };

    case types.IS_LOGGED_IN:
      return {
        ...state,
        isAuth: payload
      }

    default:
      return state;
  }
};

export default reducer;
