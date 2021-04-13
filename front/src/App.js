import React, { useEffect,useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import styled from 'styled-components'
import Register2 from "./pages/Register2";
import Home from "./pages/Home";
import MyLink from "./pages/MyLink";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

function App() {
  const headerRef = useRef(null);
  return (
    <Router>
      <Header ref={headerRef}/>
      <NotificationContainer />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/mylink"} component={MyLink}/>
        <Route exact path={"/register"} component={Register2} />
      </Switch>
    </Router>
  );
}

export default App;
