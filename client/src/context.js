import { createContext } from 'react';

const Context = createContext({
  currentUser: null,
  isSignedIn: false,
  draft: null,
  pins: [],
  currentPin: null
});

export default Context;
