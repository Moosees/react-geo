import "mapbox-gl/dist/mapbox-gl.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './pages/App';
import Splash from "./pages/Splash";
import * as serviceWorker from './serviceWorker';

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App/>
        </Route>
        <Route path="/login">
          <Splash/>
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
