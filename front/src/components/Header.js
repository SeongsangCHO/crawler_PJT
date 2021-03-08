import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import "./css/Header.css";
import { ReactComponent as Logo } from "assets/logoimage.svg";
import RegisterModal from "components/RegisterModal/RegisterModal";
import LoginModal from "components/LoginModal/LoginModal";
import CreateNotification from "./CreateNotification";
import { NotificationContainer } from "react-notifications";

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
  const isLogined = useSelector((state) => state.loginReducer.isLogined);
  const userNickName = useSelector((state) => state.loginReducer.user_nickname);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if(isLogined === true){
      CreateNotification("success")("로그인 성공");
    } 
    if(isLogined === false){
      CreateNotification("error")("로그인 실패");
    }
  },[isLogined]);

  //custom hooks로 뺴기
  const onToggleRegisterModal = () => {
    setIsRegisterModalOpen((prev) => !prev);
  };
  const onToggleLoginModal = () => {
    setIsLoginModalOpen((prev) => !prev);
  };

  return (
    <div className="header-wrapper">
      {isRegisterModalOpen == true ? (
        <RegisterModal
          onToggleRegisterModal={onToggleRegisterModal}
          onToggleLoginModal={onToggleLoginModal}
        />
      ) : (
        false
      )}
      {isLoginModalOpen && !isLogined ? (
        <LoginModal
          onToggleRegisterModal={onToggleRegisterModal}
          onToggleLoginModal={onToggleLoginModal}
        />
      ) : (
        false
      )}
      <div id="Top-header">
        <div id="left-header-section">
          <NavLink to={"/"}>
            <Logo id="LogoImage" width="100px" height="50px" alt="LOGO"/>
            {/* <img id="LogoImage" src={LogoImage} alt="React Logo" /> */}
            <div id="Logo">다링</div>
          </NavLink>
        </div>
        <div id="Top-header-right">
          {!isLogined ? (
            <>
              <button onClick={onToggleLoginModal}>LOGIN</button>
              <button onClick={onToggleRegisterModal}>REGISTER</button>
            </>
          ) : (
            <span>{userNickName}님 안녕하세요</span>
          )}
        </div>
      </div>
      <NavBar />
      <NotificationContainer />
    </div>
  );
}

export default React.memo(Header);
