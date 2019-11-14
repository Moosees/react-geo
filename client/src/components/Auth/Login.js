import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GraphQLClient } from 'graphql-request';
import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
import { LOGIN_USER } from '../../types';

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const handleLogin = async user => {
    try {
      const idToken = user.getAuthResponse().id_token;
      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: { authorization: idToken }
      });
      const { me } = await client.request(ME_QUERY);

      dispatch({ type: LOGIN_USER, payload: me });
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
