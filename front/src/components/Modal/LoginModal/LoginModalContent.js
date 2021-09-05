import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CreateNotification from "components/CreateNotification";
import Button from "components/common/Button";
import InputLabel from "components/common/InputLabel";
import { requestLogin } from "redux/actions/Login";

const LoginModalContent = ({ onToggleLoginModal, onToggleRegisterModal }) => {
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.loginReducer);

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

  useEffect(() => {
    if (status === "FAILURE") {
      CreateNotification("error")("닉네임 또는 비밀번호가 틀렸습니다.");
    }
  }, [status]);
  const onLogin = (e) => {
    e.preventDefault();
    console.log(status);
    if (nickName === "" || password === "") {
      CreateNotification("error")("입력을 확인하세요.");
      return;
    } else {
      dispatch(requestLogin({ nickName, password }));
    }
  };
  return (
    <Wrapper>
      <LoginForm onSubmit={onLogin}>
        <ModalTitle>Login</ModalTitle>
        <InputLabel>Your Nickname</InputLabel>
        <Input
          onChange={onHandleNickName}
          type="text"
          placeholder="Nickname"
        ></Input>
        <InputLabel>Password</InputLabel>
        <Input
          onChange={onHandlePassword}
          type="password"
          placeholder="Password"
        ></Input>

        <ButtonContainer>
          <SubmitButton type="submit">Login</SubmitButton>
          <RegisterButton onClick={onMoveRegisterModal} type="button">
            Register
          </RegisterButton>
        </ButtonContainer>
      </LoginForm>
    </Wrapper>
  );
};

export default React.memo(LoginModalContent);
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  background-color: #2196f3;
  color: white;
`;

const Input = styled.input`
  margin-bottom: 15px;
`;
const ModalTitle = styled.h1`
  font-size: 1.5em;
  margin-bottom: 15px;
`;

const RegisterButton = styled(Button)`
  background-color: green;
  color: white;
`;
