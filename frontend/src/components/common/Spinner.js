import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Dim>
      <CommonSpinner></CommonSpinner>
    </Dim>
  );
};
export default Spinner;

const Dim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;
const CommonSpinner = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(50% - 24px);
  left: calc(50% - 24px);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid white;
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
