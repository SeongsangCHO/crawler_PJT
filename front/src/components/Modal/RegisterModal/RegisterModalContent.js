import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import NickNameInput from "./NickNameInput";
import PasswordInput from "./PasswordInput";
import "react-notifications/lib/notifications.css";
import CreateNotification from "components/CreateNotification";
import { requestSignUp } from "redux/actions/Register";

const RegisterModalContent = ({
  onToggleRegisterModal,
  onToggleLoginModal,
}) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const { isDouble, nickName } = useSelector((state) => state.registerReducer);

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
      nickName === undefined ||
      nickName === "" ||
      password === "" ||
      password.length < 8 ||
      // isDouble ||
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
      if (nickName === undefined) {
        console.log(nickName);

        errorMsg = "닉네임 중복";
      }
      if (!isMatchPassword || nickName === "" || password === "") {
        console.log(nickName, password);

        errorMsg = "닉네임 또는 비밀번호를 확인해주세요";
      }
      if (password.length < 8) {
        errorMsg = "비밀번호는 8글자 이상으로 입력해주세요.";
      }
      CreateNotification("error")(errorMsg);
      return;
    } else {
      dispatch(requestSignUp({ nickName, password }));
      // dispatch({
      //   type: "SIGN_UP_REQUEST",
      //   data: {
      //     user_nickname: nickName,
      //     user_password: password,
      //   },
      // });
      CreateNotification("success")("가입 성공");
      setIsSignUp(true);
    }
  };

  return (
    <RegisterForm onSubmit={onSignUp}>
      <ModalTitle>Create Account</ModalTitle>
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
  flex-direction: column;
  width: 100%;
  padding: 20px;
  & input + input {
    margin-top: 15px;
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

const ModalTitle = styled.h1`
  font-size: 1.5em;
  margin-bottom: 15px;
`;
