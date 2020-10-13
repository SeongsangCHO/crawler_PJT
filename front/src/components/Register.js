import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

const RegisterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const NickInput = styled.input`
  width: fit-content;
  border: 1px solid #000;
  margin-bottom: 15px;
`;
const PasswordInput = styled.input`
  width: fit-content;
  border: 1px solid #000;
  margin-bottom: 15px;
`;
const PasswordCheck = styled.input`
  width: fit-content;

  border: 1px solid #000;
  margin-bottom: 15px;
`;

const DoubleCheck = styled.button`
  background-color: lavender;
`;

const RegisterButton = styled.button`
  background-color: lavender;
`;
function Register() {
  const dispatch = useDispatch();

  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handlePasswordCheck = (e) => {
    let doubleCheckValue = e.target.value;
    if (doubleCheckValue == "") {
      setPasswordCheck(false);
      return false;
    }
    if (doubleCheckValue == password) {
      setPasswordCheck(true);
      console.log("비밀번호 일치");
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordCheck == false && setPassword != "") {
      console.log("비번이 공백이거나 일치하지 않음");
      alert("비밀번호가 공백이거나 일치하지 않아요");
      return false;
    }
    return dispatch({
      type: "SIGN_UP_REQUEST",
      data: {
        user_nickname: nickName,
        user_password: password,
      },
    });
  };
  const handleNickName = (e) => {
    setNickName(e.target.value);
    console.log(e.target.value);
  };
  const getNickName = (e) => {
    console.log(nickName);
    //여기서 서버에서 가져온 데이터랑 중복체크
  };
  return (
    <RegisterWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <label>닉네임</label>
        </div>
        <NickInput
          onChange={handleNickName}
          id="nick"
          type="text"
          placeholder="닉네임입력"
        ></NickInput>
        <DoubleCheck onClick={getNickName} type="button">
          {" "}
          닉네임 중복체크{" "}
        </DoubleCheck>
        <div>
          <label>패스워드</label>
        </div>
        <PasswordInput
          type="password"
          onChange={handlePasswordInput}
          placeholder="비밀번호"
        ></PasswordInput>{" "}
        <div>
          <label>패스워드 확인</label>
        </div>
        <PasswordCheck
          onFocus={handlePasswordCheck}
          onChange={handlePasswordCheck}
          type="password"
          placeholder="비밀번호 확인"
        ></PasswordCheck>
        {passwordCheck == true ? (
          <label>패스워드 일치</label>
        ) : (
          <label>패스워드 확인해주세요.</label>
        )}
        <div>
          <RegisterButton type="submit">가입</RegisterButton>
        </div>
      </form>
    </RegisterWrapper>
  );
}

export default Register;
