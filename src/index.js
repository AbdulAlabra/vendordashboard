import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxStore from 'redux-store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './translations-i18next';
ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
