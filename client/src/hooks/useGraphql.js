import { GraphQLClient } from 'graphql-request';
import { useEffect, useState } from 'react';

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000/graphql';

export const useGraphql = () => {
  const [idToken, setIdToken] = useState(null);
  const [client, setClient] = useState(null);

  const token = window.gapi.auth2
    .getAuthInstance()
    .currentUser.get()
    .getAuthResponse().id_token;

  useEffect(() => {
    if (token) {
      setIdToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (idToken) {
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      });
      setClient(client);
    }
  }, [idToken]);

  return { client };
};
