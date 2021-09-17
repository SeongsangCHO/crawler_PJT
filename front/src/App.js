import React from "react";
import Header from "./components/common/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "pages/Home";
import MyLink from "pages/Mylink";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import Navbar from "components/Navbar/Navbar";
import PrivateRoute from "components/common/PrivateRoute";
import UnAuthPage from "pages/UnAuthPage";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <NotificationContainer />
      <Switch>
        <Route exact path={"/"} component={Home} />
        {/* <Route exact path={"/mylink"} component={MyLink} /> */}
        <PrivateRoute exact path="/mylink" component={MyLink} />
        <Route exact path="/401" component={UnAuthPage} />
      </Switch>
    </Router>
  );
}

export default App;
