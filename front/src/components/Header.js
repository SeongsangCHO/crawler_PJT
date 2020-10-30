import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "./css/Header.css";

function Jumbotron() {
  return <div id="jumbotron">Jumbotron</div>;
}

const NavBarWrapper = styled.div``;

function NavBar() {
  return (
    <NavBarWrapper id="NavBarWrapper">
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>{" "}
        <li>
          <NavLink to={"/mylink"}>mylink</NavLink>
        </li>
        <li>
          <NavLink to={"/mylink"}>할인정보확인</NavLink>
        </li>
      </ul>
    </NavBarWrapper>
  );
}

function Header() {
  const isLogined = useSelector((state) => state.loginReducer.isLogined);
  const userNickName = useSelector((state) => state.loginReducer.user_nickname);
  return (
    <div className="header-wrapper">
      <div id="Top-header">
        <div id="Logo">다링</div>
        <div id="Top-header-left">
          <NavLink className="register" to={"/register"}>
            register
          </NavLink>
          {!userNickName ? (
            <NavLink className="login" to={"/login"}>
              login
            </NavLink>
          ) : (
            <span>{userNickName}님 안녕하세요</span>
          )}
        </div>
      </div>
      <NavBar />
      <Jumbotron />
    </div>
  );
}

export default Header;
