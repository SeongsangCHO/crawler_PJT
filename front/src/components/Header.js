import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NavLink, Link, useHistory } from "react-router-dom";
import "./css/Header.css";
import { ReactComponent as Logo } from "assets/logoimage.svg";
import CreateNotification from "./CreateNotification";
import Modal from "./Modal/Modal";
import RegisterModalContent from "./RegisterModal/RegisterModalContent";
import LoginModalContent from "./LoginModal/LoginModalContent";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
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

const LogoutButton = styled.button`
  border: none;
  margin-left: 10px;
  min-width: 70px;
  border-radius: 5px;
  color: white;
  background-color: coral;
  height: 50%;
  transition: 0.4s;
  :hover {
    color: gray;
  }
`;

const HeaderWrapper = styled.div``;

const LogoWrapper = styled.div`
  margin-left: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const TitleLink = styled.span`
  color: black;
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
//새로고침해도 유저의 닉네임을 가져올 수 있도록 하기.
function Header() {
  const isLogined = useSelector((state) => state.loginReducer.isLogined);
  const token = useSelector((state) => state.loginReducer.token);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogined === true) {
      CreateNotification("success")("로그인 성공");
      console.log(token);
    }
    if (isLogined === false) {
      CreateNotification("error")("로그인 실패");
    }
    //cookies는 객체니까 이전상태랑 레퍼런스가 달라지지 않는구나
  }, [isLogined, cookies]);

  //custom hooks로 뺴기 => useCallback으로 변경하기
  const onToggleRegisterModal = () => {
    setIsRegisterModalOpen((prev) => !prev);
  };
  const onToggleLoginModal = () => {
    setIsLoginModalOpen((prev) => !prev);
  };
  const doLogOut = () => {
    dispatch({
      type: "LOGOUT_REQUEST",
      message: "LOGOUT REQUEST",
    });
  };
  const onLogout = () => {
    doLogOut();
    // removeCookie("user");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    CreateNotification("success")("로그아웃 되었습니다.");
  };

  return (
    <HeaderWrapper>
      {isRegisterModalOpen == true ? (
        <Modal modalId="Register" onToggleModal={onToggleRegisterModal}>
          <RegisterModalContent
            onToggleRegisterModal={onToggleRegisterModal}
            onToggleLoginModal={onToggleLoginModal}
          />
        </Modal>
      ) : (
        false
      )}
      {isLoginModalOpen && !isLogined ? (
        <Modal modalId="Login" onToggleModal={onToggleLoginModal}>
          <LoginModalContent
            onToggleRegisterModal={onToggleRegisterModal}
            onToggleLoginModal={onToggleLoginModal}
          />
        </Modal>
      ) : (
        false
      )}
      <div id="Top-header">
        <LogoWrapper>
          <NavLink style={{ textDecoration: "none" }} to={"/"}>
            <Logo id="LogoImage" width="100px" height="50px" alt="LOGO" />
            <TitleLink style={{ textDecoration: "none" }} id="TitleLink">
              다링
            </TitleLink>
          </NavLink>
        </LogoWrapper>
        <ButtonWrapper>
          {cookies.user === undefined && !isLogined ? (
            <>
              <SignUpButton onClick={onToggleRegisterModal}>
                Sign Up
              </SignUpButton>
              <LoginButton onClick={onToggleLoginModal}>Log In</LoginButton>
            </>
          ) : (
            <>
              <span>{jwt_decode(token).nickname}님 안녕하세요</span>
              <LogoutButton onClick={onLogout}>Logout</LogoutButton>
            </>
          )}
        </ButtonWrapper>
      </div>
      <NavBar />
    </HeaderWrapper>
  );
}

export default React.memo(Header);
