import React, { useState, useEffect } from "react";
import styles from "components/css/RegisterModal.module.css";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logoimage.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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
  margin-top: 5px;
`;
const RegisterModal = ({ onToggleRegisterModal, onToggleLoginModal }) => {
  const onCloseRegisterModal = (e) => {
    console.log(e.currentTarget.id);
    if (
      e.target.id === "RegisterModalWrapper" ||
      e.target.id === "CloseRegisterModal"
    ) {
      onToggleRegisterModal();
    }
  };
  const onMoveLoginModal = () =>{
    onToggleRegisterModal();
    onToggleLoginModal();
  }
  return (
    <RegisterModalWrapper
      id="RegisterModalWrapper"
      onClick={onCloseRegisterModal}
    >
      <RegisterModalContent id="RegisterModalContent">
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
          <InputTitle>Your Nickname</InputTitle>
          <Input type="text" placeholder="Nickname"></Input>

          <InputTitle>Password</InputTitle>
          <Input type="password" placeholder="Password"></Input>
          <InputTitle>Check Password</InputTitle>
          <Input type="password" placeholder="Check Password"></Input>
          <SubmitButton type="submit">Register</SubmitButton>

          <LoginButton onClick={onMoveLoginModal} type="button">Login</LoginButton>
        </RegisterForm>
      </RegisterModalContent>
    </RegisterModalWrapper>
  );
};

export default RegisterModal;