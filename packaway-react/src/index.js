import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux';

import combinedReducers from "./redux/reducers";
import "./index.scss";
import App from "./App";


const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const firebase = require('firebase/app');

var firebaseConfig = {
  apiKey: "AIzaSyD0046qdfjbFJEm3qxSeJ8v6TcIPyzzjk8",
  authDomain: "packaway-72184.firebaseapp.com", 
  databaseURL: "https://packaway-72184.firebaseio.com",
  projectId: "packaway-72184",
  storageBucket: "packaway-72184.appspot.com",
  messagingSenderId: "245124234502",
  appId: "1:245124234502:web:7a02d2b1e92c9f50"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
