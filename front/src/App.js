import React, { useEffect } from "react";
import "./App.css";
import Content from "./components/Content";
import Contentc from "./components/Contentc";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function App() {

  return (
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
  );
}

export default App;
