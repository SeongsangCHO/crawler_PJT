import React, { useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import MyLink from "./pages/MyLink";
import NotificationContainer from "react-notifications/lib/NotificationContainer";

function App() {
  const headerRef = useRef(null);
  return (
    <Router>
      <Header ref={headerRef} />
      <NotificationContainer />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/mylink"} component={MyLink} />
      </Switch>
    </Router>
  );
}

export default App;
