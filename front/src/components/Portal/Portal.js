import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const modalRoot = document.querySelector("#modal-root");

const Portal = ({ children, ...restProps }) => {
  return ReactDOM.createPortal(
    <ModalWrapper id="dim" {...restProps}>
      {children}
    </ModalWrapper>,
    modalRoot
  );
};

export default Portal;
const ModalWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
`;
