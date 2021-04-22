import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CreateNotification from "components/CreateNotification";

const LoginForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 15px;
  @media (max-width: 576px) {
    padding: 15px;
  }
`;

const InputTitle = styled.span`
  margin: 0px 0 5px 0;
  font-size: 10px;
`;

const SubmitButton = styled.button`
  border: 1px solid;
  background-color: #2196F3;
  color:white;
`;

const Input = styled.input`
  margin-bottom: 15px;
`;

const RegisterButton = styled.button`
  border: 1px solid;
  margin-top: 5px;
  background-color:green;
  color:white;
`;
const LoginModalContent = ({ onToggleLoginModal, onToggleRegisterModal }) => {
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");

  /* 해당 부분 개선해야함. 모달창 끼리 중복됨, 모달창 컴포넌트화해서 중복제거할것 */
  const onMoveRegisterModal = () => {
    onToggleLoginModal();
    onToggleRegisterModal();
  };
  const onHandleNickName = (e) => {
    setNickName(e.target.value);
  };
  const onHandlePassword = (e) => {
    setPassword(e.target.value);
  };
  const isLogined = useSelector((state) => state.loginReducer.isLogined);



  const onLogin = (e) => {
    e.preventDefault();
    if (nickName === "" || password === "") {
      CreateNotification("error")("입력을 확인하세요.");
      return;
    } else {
      dispatch({
        type: "LOGIN_REQUEST",
        data: {
          user_nickname: nickName,
          user_password: password,
          isLogined: false,
        },
      });
    }
  };
  return (
    <LoginForm onSubmit={onLogin}>
      <span>Login</span>
      <InputTitle>Your Nickname</InputTitle>
      <Input
        onChange={onHandleNickName}
        type="text"
        placeholder="Nickname"
      ></Input>

      <InputTitle>Password</InputTitle>
      <Input
        onChange={onHandlePassword}
        type="password"
        placeholder="Password"
      ></Input>

      <SubmitButton type="submit">Login</SubmitButton>
      <RegisterButton onClick={onMoveRegisterModal} type="button">
        Register
      </RegisterButton>
    </LoginForm>
  );
};

export default React.memo(LoginModalContent);
