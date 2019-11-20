import { createContext } from 'react';

const Context = createContext({
  currentUser: null,
  googleUser: null,
  draft: null,
  pins: []
});

export default Context;
