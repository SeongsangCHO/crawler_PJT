import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import NickNameInput from "./NickNameInput";
import PasswordInput from "./PasswordInput";
import "react-notifications/lib/notifications.css";
import CreateNotification from "components/CreateNotification";

const RegisterModalContent = ({
  onToggleRegisterModal,
  onToggleLoginModal,
}) => {
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

  // useCallback으로 변경하기
  const handlePassword = (inputPassword) => {
    setPassword(inputPassword);
  };
  // useCallback으로 변경하기
  const handleMatchPassword = (isMatch) => {
    setIsMatchPassword(isMatch);
  };

  // useCallback으로 변경하기
  const onMoveLoginModal = () => {
    onToggleRegisterModal();
    onToggleLoginModal();
  };
  const signUpVaildCheck = () => {
    if (
      userNickName === undefined ||
      userNickName === "" ||
      password === "" ||
      password.length < 8 ||
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
      if (password.length < 8) {
        errorMsg = "비밀번호는 8글자 이상으로 입력해주세요.";
      }
      CreateNotification("error")(errorMsg);
      return;
    } else {
      dispatch({
        type: "SIGN_UP_REQUEST",
        data: {
          user_nickname: userNickName,
          user_password: password,
        },
      });
      CreateNotification("success")("가입 성공");
      setIsSignUp(true);
    }
  };

  return (
    <RegisterForm onSubmit={onSignUp}>
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

      <LoginButton isSignUp={isSignUp} onClick={onMoveLoginModal} type="button">
        Login
      </LoginButton>
    </RegisterForm>
  );
};

export default React.memo(RegisterModalContent);
const RegisterForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 15px;
  @media (max-width: 576px) {
    padding: 15px;
  }
`;

const SubmitButton = styled.button`
  border: 1px solid;
  background-color: ${(props) => (props.isDisabled ? "green" : "gray")};
  transition: 0.5s;
  color: white;
`;

const LoginButton = styled.button`
  border: 1px solid;
  background-color: ${(props) => (props.isSignUp ? "#2196F3" : "gray")};
  color: white;
  transition: 0.5s;
  margin-top: 5px;
`;
