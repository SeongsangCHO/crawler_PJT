import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logoimage.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "react-notifications/lib/notifications.css";
import Portal from "components/Portal/Portal";

const Modal = ({ children, modalId, onToggleModal }) => {
  const onClose = (e) => {
    if (e.target.id === modalId || e.target.id === "Close" + modalId)
      onToggleModal();
  };
  return (
    <Portal>
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
    </Portal>
  );
};

export default React.memo(Modal);

const ModalWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
`;
const ModalContent = styled.div`
  position: relative;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  max-width: 450px;
  width: 55%;
  border-radius: 5px;
  @media (max-width: 576px) {
    min-height: 50vh;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
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
