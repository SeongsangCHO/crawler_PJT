import React from "react";
import "./App.css";
import Content from "./components/Content";
import Contentc from "./components/Contentc";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import configureStore from "./redux/store";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore();
console.log(store.getState());

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <div className="App">
            <Header />
            <Route exact path={"/mylink"} component={Contentc} />
            <Route exact path={"/register"} component={Register} />
            <Route exact path={"/login"} component={Login} />

            <Footer />
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
