import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'reactProjects/Imagetile/store/configureStore';
import App from 'reactProjects/Imagetile/components/App';
import 'reactProjects/Imagetile/styles/tile_core.css';
import 'reactProjects/Imagetile/styles/bootstrap.min.css';

const store = configureStore();

const Imagetile = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Imagetile;
