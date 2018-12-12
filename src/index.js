import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from './components/App';
import configureStore from './store/configureStore';
import { history } from './helpers/history';
import initialState from './store/initialState';

const store = configureStore(initialState, history);

let root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  MOUNT_NODE,
);
