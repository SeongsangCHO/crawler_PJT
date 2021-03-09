import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logoimage.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { NotificationContainer } from "react-notifications";
import CreateNotification from "components/CreateNotification";

const LoginModalWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
`;


const LoginForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 15px;
  @media (max-width: 576px) {
    padding: 5px;
  }
`;

const InputTitle = styled.span`
  margin: 0px 0 5px 0;
  font-size: 10px;
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
`;

const Input = styled.input`
  margin-bottom: 15px;
`;
const CloseButton = styled.button`
  position: relative;
  display: inline-block;
  left: 100%;
  transform: translate(-100%, 0);
  padding: 5px 5px 0 0;
  cursor: pointer;
  border: none;
  background-color: white;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
`;
const RegisterButton = styled.button`
  border: 1px solid;
  margin-top: 5px;
`;
const LoginModalContent = ({
  handleLogined,
  onToggleLoginModal,
  onToggleRegisterModal,
}) => {
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");

  const onCloseLoginModal = (e) => {
    if (
      e.target.id === "LoginModalWrapper" ||
      e.target.id === "CloseLoginModal"
    ) {
      onToggleLoginModal();
    }
  };
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
          isLogined: "REQUEST",
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
