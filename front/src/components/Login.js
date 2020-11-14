import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
const LoginFormWrapper = styled.div`
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
const SubmitButton = styled.button`
  background-color: lavender;
`;
function Register() {
  const dispatch = useDispatch();
  const isLogined = useSelector((state => state.loginReducer.isLogined));
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    if (isLogined == true)
    {
      console.log("로그인 성공");
      history.push("/mylink");
    }
  },[isLogined])
  const handleNickName = (e) => {
    setNickName(e.target.value);
    console.log(nickName);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const handleLogin = (e) => {
    if (nickName === "" || password === "") {
      alert("닉네임 또는 패스워드를 확인해주세요");
      return setInputValid(false);
    }
    return setInputValid(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputValid === false) {
      return false;
      
    }
    //데이터 post로 서버에 던져주기 dispatch
    dispatch({
      type: "LOGIN_REQUEST",
      data: {
        user_nickname: nickName,
        user_password: password,
      },
    });
  };
  return (
    <LoginFormWrapper>
      <form onSubmit={handleSubmit}>
        <div>로그인 페이지</div>
        <div>
          <label>닉네임</label>
        </div>
        <NickInput
        required
          onChange={handleNickName}
          id="nick"
          type="text"
          placeholder="닉네임입력"
        ></NickInput>
        <div>
          <label>패스워드</label>
        </div>
        <PasswordInput
        required
          onChange={handlePassword}
          type="password"
          placeholder="비밀번호"
        ></PasswordInput>{" "}
        <div>
          <SubmitButton onClick={handleLogin}>
            로그인
          </SubmitButton>
          <Link to={"/register"}>가입하기</Link>
        </div>
      </form>
    </LoginFormWrapper>
  );
}

export default Register;
