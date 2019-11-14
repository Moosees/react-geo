import * as types from './types';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.LOGIN_USER:
      return {
        ...state,
        currentUser: payload
      };

    default:
      return state;
  }
};

export default reducer;
