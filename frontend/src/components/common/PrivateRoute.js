import React from "react";
import { Route, Redirect } from "react-router";
import LoginButton from "./LoginButton";

const PrivateRoute = ({ component: Component, ...restProps }) => {
  const AuthCheck = () => {
    return sessionStorage.getItem("token") ? true : false;
  };
  return (
    // <Route exact path={"/"} component={Home} />

    <Route
      {...restProps}
      render={(props) =>
        AuthCheck() ? <Component {...props} /> : <Redirect to="/401" />
      }
    ></Route>
  );
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
