import  React, {useState, useEffect}  from 'react';
import styles from 'components/css/RegisterModal.module.css'
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logoimage.svg";

const RegisterModalWrapper = styled.div`
  position:fixed;
  width: 100vw;
  height: 100vh;
  z-index:1;
  background:rgba(0,0,0,.5);
`;
const RegisterModalContent = styled.div`
  position:relative;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:white;
  max-width: 50vw;
  min-height: 50vh;
`;

const RegisterForm = styled.form`
  display:flex;
  width:100%;
  flex-direction: column;
  padding: 5px;
`;

const InputTitle = styled.span`
  margin: 5px 0 5px 0;
  font-size: 10px;
`;


const RegisterModal = () => {
  return (
    <RegisterModalWrapper>
      <Logo/>
      <RegisterModalContent>
        <RegisterForm>
          <InputTitle>Your Nickname</InputTitle>
          <input type="text" placeholder="Nickname"></input>

          <InputTitle>Password</InputTitle>
          <input type="password" placeholder="Password"></input>
          <InputTitle>Check Password</InputTitle>
          <input type="password" placeholder="Check Password"></input>
        </RegisterForm>
      </RegisterModalContent>
    </RegisterModalWrapper>
  );
}


export default RegisterModal;