import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux';
import firebaseConfig from './services/config'
import combinedReducers from "./redux/reducers";
import "./index.scss";
import App from "./App";


const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const firebase = require('firebase/app');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
