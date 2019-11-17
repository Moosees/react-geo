import { createContext } from 'react';

const Context = createContext({
  currentUser: null,
  googleUser: null,
  draft: null
});

export default Context;
