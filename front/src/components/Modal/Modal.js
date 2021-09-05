import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logoimage.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "react-notifications/lib/notifications.css";

const ModalWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
`;
const ModalContent = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  max-width: 50vw;
  min-height: 400px;
  border-radius: 5px;

  @media (max-width: 576px) {
    min-height: 50vh;
  }
`;

const ModalForm = styled.form`
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
const Modal = ({ children, modalId, onToggleModal }) => {
  //모달창의 X버튼 또는 밖 영역 클릭시 발생
  //onToggleModal은 boolean state로 부모에서 조건부랜더링 수행

  // useCallback으로 변경하기
  const onClose = (e) => {
    if (e.target.id === modalId || e.target.id === "Close" + modalId)
      onToggleModal();
  };
  return (
    <ModalWrapper id={modalId} onClick={onClose}>
      <ModalContent id="ModalContent">
        <CloseButton>
          <FontAwesomeIcon
            id={"Close" + modalId}
            size="2x"
            icon={faTimesCircle}
          />
        </CloseButton>
        <LogoWrapper id="LogoWrapper">
          <Logo />
        </LogoWrapper>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default React.memo(Modal);
