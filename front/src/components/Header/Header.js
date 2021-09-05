import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import CreateNotification from "../common/CreateNotification";
import FormModal from "components/Modal/FormModal";
import RegisterModalContent from "components/Modal/RegisterModal/RegisterModalContent";
import LoginModalContent from "components/Modal/LoginModal/LoginModalContent";
import jwt_decode from "jwt-decode";
import HomeLogo from "./HomeLogo";
import Button from "components/common/Button";
import { requestLogout } from "redux/actions/Login";

const Header = () => {
  const [displayUserName, setDisplayUserName] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { isLogined, token } = useSelector((state) => state.loginReducer);
  const loginChecker = () => {
    if (isLogined) {
      CreateNotification("success")("로그인 성공");
      try {
        const userName = jwt_decode(token).nickname;
        setDisplayUserName(userName);
      } catch (e) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    loginChecker();
  }, [isLogined]);
  const onToggleRegisterModal = () => {
    setIsRegisterModalOpen((prev) => !prev);
  };
  const onToggleLoginModal = () => {
    setIsLoginModalOpen((prev) => !prev);
  };
  const onLogout = (e) => {
    e.stopPropagation();
    dispatch(requestLogout());
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    CreateNotification("success")("로그아웃 되었습니다.");
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <HeaderWrapper>
      <HomeLogo />
      <RightSideContainer>
        {!isLogined ? (
          <>
            <SignUpButton onClick={onToggleRegisterModal}>Sign up</SignUpButton>
            <LoginButton onClick={onToggleLoginModal}>Login</LoginButton>
          </>
        ) : (
          <>
            <span>{displayUserName}님 안녕하세요</span>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </>
        )}
      </RightSideContainer>
      {isRegisterModalOpen && (
        <FormModal modalId="Register" onToggleModal={onToggleRegisterModal}>
          <RegisterModalContent
            onToggleRegisterModal={onToggleRegisterModal}
            onToggleLoginModal={onToggleLoginModal}
          />
        </FormModal>
      )}
      {isLoginModalOpen && !isLogined && (
        <FormModal modalId="Login" onToggleModal={onToggleLoginModal}>
          <LoginModalContent
            onToggleRegisterModal={onToggleRegisterModal}
            onToggleLoginModal={onToggleLoginModal}
          />
        </FormModal>
      )}
    </HeaderWrapper>
  );
};

export default React.memo(Header);
const RightSideContainer = styled.div`
  display: flex;
  width: 150px;
`;

const SignUpButton = styled(Button)`
  background-color: tomato;
  color: white;
  width: 100%;
  border-radius: 5px;
  margin-right: 15px;
  transition: 0.4s;
  :hover {
    background-color: white;
    color: tomato;
  }
`;
const LoginButton = styled(Button)`
  width: 100%;
  background-color: white;
  transition: 0.4s;
  border: 1px solid rgba(0, 0, 0, 0.3);
  :hover {
    color: gray;
  }
`;

const LogoutButton = styled(Button)`
  margin-left: 10px;
  width: 100%;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1em 0 1em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;
