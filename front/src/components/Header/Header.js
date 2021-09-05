import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CreateNotification from "../CreateNotification";
import Modal from "../Modal/Modal";
import RegisterModalContent from "../Modal/RegisterModal/RegisterModalContent";
import LoginModalContent from "../LoginModal/LoginModalContent";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar";
import HomeLogo from "./HomeLogo";

const Header = forwardRef((props, ref) => {
  const token = useSelector((state) => state.loginReducer.token);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const dispatch = useDispatch();
  const isLogined = useSelector((state) => state.loginReducer.isLogined);
  useEffect(() => {
    if (isLogined === true) {
      CreateNotification("success")("로그인 성공");
    }
    if (isLogined === false) {
      CreateNotification("error")("로그인 실패");
    }
  }, [isLogined, cookies]);
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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    CreateNotification("success")("로그아웃 되었습니다.");
  };

  return (
    <HeaderWrapper>
      {/* {isRegisterModalOpen == true ? (
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
      </div> */}
      <HomeLogo />
      <Navbar />
    </HeaderWrapper>
  );
});

export default React.memo(Header);

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

const HeaderWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  border: 1px solid black;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;
