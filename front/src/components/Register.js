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
import { withRouter } from "react-router";

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
  const isDouble = useSelector((state) => state.registerReducer.isDouble);
  const userData = useSelector((state) => state.registerReducer);
  const history = useHistory();
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  //submitting값이 변화할 때 수행되는 useEffect()
  useEffect(() => {
    //닉네임 중복체크했는지에 대한 여부도 확인
    //
    if (submitting == true) {
      console.log("submitting is true");
      //route하는 부분, post요청을 한 다음 해당 uri로 이동
      //로그인페이지로 이동시키면 될듯.
      history.push("/");
    }
  }, [submitting, isDouble]); //컴포넌트 갱신 => form 작성 시 수행되야함 , 인자 [] 넣지않음.

  //비밀번호 인풋 셋팅
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    setSubmitting(false);
  };

  //비밀번호 더블체크  부분
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

  //form 제출버튼 클릭시 발생하는 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordCheck == false && setPassword != "") {
      alert("비밀번호가 공백이거나 일치하지 않아요");
      return setSubmitting(false);
    }
    dispatch({
      type: "SIGN_UP_REQUEST",
      data: {
        user_nickname: nickName,
        user_password: password,
      },
    });
    return setSubmitting(true);
  };
  //nickname 입력시 이벤트발생마다 set되는 부분
  const handleNickName = (e) => {
    setNickName(e.target.value);
    setSubmitting(false);
  };
  const getNickName = (e) => {
    //여기서 서버에서 가져온 데이터랑 중복체크
    dispatch({
      type: "NICK_DOUBLE_CHECK_REQUEST",
      data: {
        user_nickname: nickName,
      },
    });
    console.log(isDouble);
  };
  return (
    <RegisterWrapper>
      <form onSubmit={handleSubmit}>
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
        <DoubleCheck onClick={getNickName} type="button">
          {" "}
          닉네임 중복체크{" "}
        </DoubleCheck>
        <div>
          <label>패스워드</label>
        </div>
        <PasswordInput
        required
          type="password"
          onChange={handlePasswordInput}
          placeholder="비밀번호"
        ></PasswordInput>{" "}
        <div>
          <label>패스워드 확인</label>
        </div>
        <PasswordCheck
        required
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
          {isDouble == true ? (
            <RegisterButton type="submit" required>가입</RegisterButton>
          ) : (
            <label> 닉네임 중복체크를 확인해주세요.</label>
          )}
        </div>
      </form>
    </RegisterWrapper>
  );
}

export default Register;
