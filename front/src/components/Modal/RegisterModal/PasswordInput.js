import InputLabel from "components/common/InputLabel";
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
  const [validText, setValidText] = useState(
    "8글자 이상 비밀번호를 입력해주세요."
  );

  const onMatchPassword = (password, target) => {
    if (password === target) {
      handleMatchPassword(true);
      setValidText("비밀번호가 일치합니다");
    } else {
      handleMatchPassword(false);
      setValidText("비밀번호가 일치하지 않습니다.");
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
      <InputLabel>Password</InputLabel>
      <Input
        value={firstPassword}
        onChange={onChangePassword}
        type="password"
        placeholder="Password"
      ></Input>

      <InputLabel>Check Password</InputLabel>
      <Input
        onChange={onCheckPassword}
        type="password"
        placeholder="Check Password"
      ></Input>
      <span>{validText}</span>
    </>
  );
};

export default React.memo(PasswordInput);
