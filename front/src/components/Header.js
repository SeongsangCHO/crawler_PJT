import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import "./css/Header.css";
import { ReactComponent as Logo } from "./public/logoimage.svg";
import { ReactComponent as JumbotronImage } from "./public/jumbotron.svg";

import LogoImage from "./public/logoimage.svg";

function Jumbotron() {
  return <div id="jumbotron">Jumbotron</div>;
}

const NavBarWrapper = styled.div``;

function NavBar() {
  return (
    <NavBarWrapper id="NavBarWrapper">
      <ul id="nav-bar-ul">
        <li>
          <NavLink to={"/"} id="nav-item-home" className="nav-item">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/mylink"} className="nav-item">
            mylink
          </NavLink>
        </li>
      </ul>
    </NavBarWrapper>
  );
}

function Header() {
  const isLogined = useSelector(state => state.loginReducer.isLogined);
  const userNickName = useSelector(state => state.loginReducer.user_nickname);
  return (
    <div className="header-wrapper">
      <div id="Top-header">
        <div id="left-header-section">
          <NavLink to={"/"}>
            <Logo id="LogoImage" width="100px" height="50px" />
            {/* <img id="LogoImage" src={LogoImage} alt="React Logo" /> */}
            <div id="Logo">다링</div>
          </NavLink>
        </div>
        <div id="Top-header-right">
          <NavLink className="user-register" to={"/register"}>
            register
          </NavLink>
          {!userNickName ? (
            <NavLink className="user-register" to={"/login"}>
              login
            </NavLink>
          ) : (
            <span>{userNickName}님 안녕하세요</span>
          )}
        </div>
      </div>
      <NavBar />
    </div>
  );
}

export default Header;
