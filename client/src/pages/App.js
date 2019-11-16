import React from 'react';
import Header from '../components/Header';
import MapView from '../components/MapView';
import withRoot from '../withRoot';

const App = () => {
  return (
    <>
      <Header />
      <MapView />
    </>
  );
};

export default withRoot(App);
