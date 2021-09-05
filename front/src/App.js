import React, { useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "pages/Home";
import MyLink from "pages/Mylink";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import Navbar from "components/Header/Navbar";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <NotificationContainer />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/mylink"} component={MyLink} />
      </Switch>
    </Router>
  );
}

export default App;
