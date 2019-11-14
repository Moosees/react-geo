import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Context from './context';
import App from './pages/App';
import Splash from './pages/Splash';
import ProtectedRoute from './ProtectedRoute';
import reducer from './reducer';
import * as serviceWorker from './serviceWorker';

const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <Switch>
          <Route exact path="/">
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          </Route>
          <Route path="/login">
            <Splash />
          </Route>
        </Switch>
      </Context.Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
