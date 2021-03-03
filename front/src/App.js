import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import MyLink from "./pages/MyLink";

function App() {

  return (
    <Router>
      <Header />

      <Switch>
        <div className="App">
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/mylink"} component={MyLink} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/login"} component={Login} />
        </div>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
