import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import "./css/Header.css";
import { ReactComponent as logoImage } from "./public/logoimage.svg";
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
          <Link to={"/"}>
            <a className="nav-item">Home</a>
          </Link>
        </li>
        <li>
          <NavLink to={"/hmoe"} className="nav-item">
            ㅋ
          </NavLink>
        </li>{" "}
        <li>
          <NavLink to={"/mylink"} className="nav-item">
            mylink
          </NavLink>
        </li>
        <li>
          <NavLink to={"/bv"} className="nav-item">
            할인정보확인
          </NavLink>
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
        <div id="left-header-section">
          <img id="LogoImage" src={LogoImage} alt="React Logo" />
          <div id="Logo">다링</div>
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
      <Jumbotron />
    </div>
  );
}

export default Header;
