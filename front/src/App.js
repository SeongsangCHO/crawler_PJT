import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Content from "./components/Content";
import Contentc from "./components/Contentc";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import configureStore from "./redux/store";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = configureStore();
console.log(store.getState())

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path={"/"} component={Contentc}></Route>
          <Route path={"/register"} component={Register} />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
