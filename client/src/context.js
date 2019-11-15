import { createContext } from 'react';

const Context = createContext({
  currentUser: null,
  googleUser: null
});

export default Context;
