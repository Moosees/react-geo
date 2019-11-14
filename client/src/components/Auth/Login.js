import { withStyles } from '@material-ui/core/styles';
import { GraphQLClient } from 'graphql-request';
import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import Context from '../../context';
import { LOGIN_USER } from '../../types';
// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`;

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const handleLogin = async user => {
    const idToken = user.getAuthResponse().id_token;
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: { authorization: idToken }
    });
    const data = await client.request(ME_QUERY);

    dispatch({ type: LOGIN_USER, payload: data.me });
  };

  return (
    <GoogleLogin
      onSuccess={handleLogin}
      isSignedIn={true}
      clientId="979136694083-n0fs310alq1bf5a5dn53ahr3vsr2dpld.apps.googleusercontent.com"
    />
  );
};

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

export default withStyles(styles)(Login);
