import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

import configureStore from "./redux/store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {CookiesProvider} from 'react-cookie';

const store = configureStore();
console.log(store.getState());



ReactDOM.render(
  <Provider store={store}>
   <App />
    </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
