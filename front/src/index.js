import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import configureStore from "./redux/store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore();
console.log(store.getState());



ReactDOM.render(
  <Provider store={store}>
   <App />
    </Provider>,
  document.getElementById("root")
);
