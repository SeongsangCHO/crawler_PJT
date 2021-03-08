import React, { useState, useEffect, useRef } from "react";
import styles from "components/css/RegisterModal.module.css";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logoimage.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import NickNameInput from "./NickNameInput";
import PasswordInput from "./PasswordInput";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import CreateNotification from "components/CreateNotification";

const RegisterModalWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
`;
const RegisterModalContent = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  max-width: 50vw;
  min-height: 455px;
  border-radius: 5px;

  @media (max-width: 576px) {
    min-height: 60vh;
  }
`;

const RegisterForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 15px;
  @media (max-width: 576px) {
    padding: 5px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const SubmitButton = styled.button`
  border: 1px solid;
  background-color: ${(props) => (props.isDisabled ? "green" : "gray")};
  transition: 0.5s;
  color: white;
`;

const CloseButton = styled.div`
  position: relative;
  display: inline-block;
  left: 100%;
  transform: translate(-100%, 0);
  padding: 5px 5px 0 0;
  border: none;
  background-color: white;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;

const LoginButton = styled.button`
  border: 1px solid;
  background-color: ${(props) => (props.isSignUp ? "#2196F3" : "gray")};
  color: white;
  transition: 0.5s;
  margin-top: 5px;
`;

const RegisterModal = ({ onToggleRegisterModal, onToggleLoginModal }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const isDoubleNickName = useSelector(
    (state) => state.doubleCheckReducer.isDouble
  );
  const userNickName = useSelector(
    (state) => state.doubleCheckReducer.data.user_nickname
  );

  const handlePassword = (inputPassword) => {
    setPassword(inputPassword);
  };
  const handleMatchPassword = (isMatch) => {
    setIsMatchPassword(isMatch);
  };
  const onCloseRegisterModal = (e) => {
    if (
      e.target.id === "RegisterModalWrapper" ||
      e.target.id === "CloseRegisterModal"
    ) {
      onToggleRegisterModal();
    }
  };
  const onMoveLoginModal = () => {
    onToggleRegisterModal();
    onToggleLoginModal();
  };
  const signUpVaildCheck = () => {
    if (
      userNickName === undefined ||
      userNickName === "" ||
      password === "" ||
      isDoubleNickName ||
      !isMatchPassword
    ) {
      return true;
    }
    return false;
  };
  const onSignUp = (e) => {
    e.preventDefault();
    //예외 핸들링
    if (signUpVaildCheck()) {
      let errorMsg;
      if (isDoubleNickName || userNickName === undefined) {
        errorMsg = "닉네임 중복";
      }
      if (!isMatchPassword || userNickName === "" || password === "") {
        errorMsg = "닉네임 또는 비밀번호를 확인해주세요";
      }
      CreateNotification("error")(errorMsg);
      return;
    } else {
      // 가입 실행
      dispatch({
        type: "SIGN_UP_REQUEST",
        data: {
          user_nickname: userNickName,
          user_password: password,
        },
      });
      CreateNotification("success")();
      setIsSignUp(true);
    }
  };

  return (
    <RegisterModalWrapper
      id="RegisterModalWrapper"
      onClick={onCloseRegisterModal}
    >
      <RegisterModalContent id="RegisterModalContent" onSubmit={onSignUp}>
        <CloseButton>
          <FontAwesomeIcon
            id="CloseRegisterModal"
            size="2x"
            icon={faTimesCircle}
          />
        </CloseButton>
        <LogoWrapper id="LogoWrapper">
          <Logo />
        </LogoWrapper>

        <RegisterForm>
          <span>Create Account</span>
          <NickNameInput />
          <PasswordInput
            isMatchPassword={isMatchPassword}
            handleMatchPassword={handleMatchPassword}
            handlePassword={handlePassword}
          />

          <SubmitButton isDisabled={!signUpVaildCheck()} type="submit">
            Register
          </SubmitButton>

          <LoginButton
            isSignUp={isSignUp}
            onClick={onMoveLoginModal}
            type="button"
          >
            Login
          </LoginButton>
        </RegisterForm>
      </RegisterModalContent>
      <NotificationContainer />
    </RegisterModalWrapper>
  );
};

export default React.memo(RegisterModal);
