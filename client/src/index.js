import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import cartReducer from './Redux/Reducers';
import {Provider} from 'react-redux';
import { createStore } from 'redux';

const store = createStore(cartReducer);

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);