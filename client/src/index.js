import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import reducers from './reducers';
import './index.css';

let middlewares = [reduxThunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, reduxLogger];
}
const store = createStore(reducers, {}, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
