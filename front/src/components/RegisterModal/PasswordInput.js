import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Input = styled.input`
  margin-bottom: 15px;
`;
const InputTitle = styled.span`
  margin: 0px 0 5px 0;
  font-size: 10px;
`;

const PasswordInput = () => {
  return (
    <>
      <InputTitle>Password</InputTitle>
      <Input type="password" placeholder="Password"></Input>

      <InputTitle>Check Password</InputTitle>
      <Input type="password" placeholder="Check Password"></Input>
    </>
  );
};

export default PasswordInput;
