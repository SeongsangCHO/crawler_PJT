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
import styles from "./css/Header.css";

function Jumbotron() {
  return <div id="jumbotron">Jumbotron</div>;
}

const NavBarWrapper = styled.div``;

const SignUpButton = styled.button`
  background-color: tomato;
  color: white;
  border: none;
  height: 50%;
  width: 100px;
  border-radius: 5px;
  margin-right: 15px;
  transition: 0.4s;
  :hover {
    background-color: white;
    color: tomato;
  }
`;
const LoginButton = styled.button`
  border: none;
  background-color: white;
  height: 50%;
  transition: 0.4s;
  :hover {
    color: gray;
  }
`;
const HeaderWrapper = styled.div``;

const LogoWrapper = styled.div`
  margin-left: 32px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const TitleLink = styled.a`
  color: black;
  text-decoration: none;

  :hover {
    color: black;
  }

`;

function NavBar() {
  return (
    <NavBarWrapper id="NavBarWrapper">
      <ul id="nav-bar-ul">
        <li>
          <NavLink to={"/"} className="nav-item" exact>
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
    if (isLogined === true) {
      CreateNotification("success")("로그인 성공");
    }
    if (isLogined === false) {
      CreateNotification("error")("로그인 실패");
    }
  }, [isLogined]);

  //custom hooks로 뺴기
  const onToggleRegisterModal = () => {
    setIsRegisterModalOpen((prev) => !prev);
  };
  const onToggleLoginModal = () => {
    setIsLoginModalOpen((prev) => !prev);
  };

  return (
    <HeaderWrapper>
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
        <LogoWrapper>
          <NavLink style={{ textDecoration: 'none' }} to={"/"}>
            <Logo id="LogoImage" width="100px" height="50px" alt="LOGO" />
            <TitleLink style={{ textDecoration: 'none' }} id="TitleLink">다링</TitleLink>
          </NavLink>
        </LogoWrapper>
        <ButtonWrapper>
          {!isLogined ? (
            <>
              <SignUpButton onClick={onToggleRegisterModal}>
                Sign Up
              </SignUpButton>
              <LoginButton onClick={onToggleLoginModal}>Log In</LoginButton>
            </>
          ) : (
            <span>{userNickName}님 안녕하세요</span>
          )}
        </ButtonWrapper>
      </div>
      <NavBar />
    </HeaderWrapper>
  );
}

export default React.memo(Header);
