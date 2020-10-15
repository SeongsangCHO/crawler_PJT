import React from "react";
import { NavLink } from "react-router-dom";
function Jumbotron() {
  return <div className="jumbotron">Jumbotron</div>;
}

function Header() {
  return (
    <div className="header-wrapper">
      <NavLink className="navbar-brand" to={"/"}>
        Header
      </NavLink>
      <NavLink className="navbar-brand" to={"/register"}>
        register
      </NavLink>
      <NavLink className="navbar-brand" to={"/login"}>
        login
      </NavLink>
      <Jumbotron />
    </div>
  );
}

export default Header;
