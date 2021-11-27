import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AppLayer } from './context/TodoContext';
import reducer, { initialState } from './context/reducer';

ReactDOM.render(
  <React.StrictMode>
    <AppLayer initialState={initialState} reducer={reducer}>
      <App />
    </AppLayer>
  </React.StrictMode>,
  document.getElementById('root')
);
