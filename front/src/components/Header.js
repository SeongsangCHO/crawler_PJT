import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
function Jumbotron() {
  return <div className="jumbotron">Jumbotron</div>;
}

function Header() {

  return (
    <div className="header-wrapper">
      <NavLink className="navbar-brand" to={"/"}>
        로고
      </NavLink>
      <NavLink className="navbar-brand" to={"/mylink"}>
        mylink
      </NavLink>
      <NavLink className="navbar-brand" to={"/register"}>
        register
      </NavLink>
        <NavLink className="navbar-brand" to={"/login"}>
          login
        </NavLink>
        <NavLink className="navbar-brand" to={"/logout"}>
          logout
        </NavLink>
      <Jumbotron />
    </div>
  );
}

export default Header;
