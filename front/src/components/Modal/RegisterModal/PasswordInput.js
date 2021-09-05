import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Input = styled.input`
  margin-bottom: 15px;
`;
const InputTitle = styled.span`
  margin: 0px 0 5px 0;
  font-size: 10px;
`;

const PasswordInput = ({
  isMatchPassword,
  handlePassword,
  handleMatchPassword,
}) => {
  const [firstPassword, setFirstPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const onMatchPassword = (password, target) => {
    if (password === target) {
      handleMatchPassword(true);
    } else {
      handleMatchPassword(false);
    }
  };

  const onChangePassword = (e) => {
    handlePassword(e.target.value);
    setFirstPassword(e.target.value);
    onMatchPassword(e.target.value, checkPassword);
  };
  const onCheckPassword = (e) => {
    setCheckPassword(e.target.value);
    onMatchPassword(firstPassword, e.target.value);
  };
  return (
    <>
      <InputTitle>Password</InputTitle>
      <Input
        value={firstPassword}
        onChange={onChangePassword}
        type="password"
        placeholder="Password"
      ></Input>

      <InputTitle>Check Password</InputTitle>
      <Input
        onChange={onCheckPassword}
        type="password"
        placeholder="Check Password"
      ></Input>
      {isMatchPassword ? (
        // text가 return되는 함수를 추가해야한다.
        <span>비밀번호가 일치합니다</span>
      ) : firstPassword.length == 0 ? (
        <span>비밀번호를 입력해주세요.</span>
      ) : (
        <span>비밀번호가 다릅니다</span>
      )}
    </>
  );
};

export default React.memo(PasswordInput);
