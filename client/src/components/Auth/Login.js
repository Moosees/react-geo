import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GraphQLClient } from 'graphql-request';
import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
import { BASE_URL } from '../../hooks/useGraphql';
import { LOGIN_USER } from '../../types';

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const handleLogin = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      });
      const { me } = await client.request(ME_QUERY);

      dispatch({ type: LOGIN_USER, payload: { currentUser: me, googleUser } });
    } catch (err) {
      handleFailure(err);
    }
  };

  const handleFailure = err => {
    console.error('Login failed', err);
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: 'rgb(66, 133, 244)' }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        onSuccess={handleLogin}
        onFailure={handleFailure}
        isSignedIn={true}
        theme="dark"
        buttonText="Log in with Google"
        clientId="979136694083-n0fs310alq1bf5a5dn53ahr3vsr2dpld.apps.googleusercontent.com"
      />
    </div>
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
