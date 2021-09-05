import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const NickNameInput = () => {
  const dispatch = useDispatch();
  const isDouble = useSelector((state) => state.doubleCheckReducer.isDouble);
  const [nickName, setNickName] = useState("");
  const [validText, setValidText] = useState("사용하실 닉네임을 입력해주세요.");
  const [isValid, setIsValid] = useState(false);
  const checkSpc = /[~!@#$%^&*()_+|<>?:{}]/;
  const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ]/;

  const nickNameValidTest = (nickName) => {
    return checkKor.test(nickName) || checkSpc.test(nickName);
  };
  const setNickNameValidText = () => {
    if (isDouble) {
      setValidText("닉네임 중복입니다.");
    } else if (!isDouble && nickName.length > 0 && isValid) {
      setValidText("사용가능한 닉네임입니다.");
    } else if (!isValid) {
      setValidText("영문, 한글만 사용할 수 있습니다");
    }
  };
  const nickNameAction = (nickName) => ({
    type: "NICK_DOUBLE_CHECK_REQUEST",
    data: {
      user_nickname: nickName,
    },
    isDouble: isDouble,
  });
  const onNickNameDoubleCheck = (e) => {
    const { value } = e.target;
    if (nickNameValidTest(value)) {
      setIsValid(false);
      setValidText("영문, 한글만 사용할 수 있습니다");
    } else {
      if (isDouble) {
        setValidText("닉네임 중복입니다.");
      } else {
        setValidText("사용가능한 닉네임입니다.");
      }
      setIsValid(true);
    }
    // setNickNameValidText();
    setNickName(value);
    dispatch(nickNameAction(value));
  };
  return (
    <>
      <InputTitle>Your Nickname</InputTitle>
      <span>{validText}</span>
      <InputContainer>
        <Input
          name="nickname"
          onChange={onNickNameDoubleCheck}
          type="text"
          placeholder="Nickname"
          maxlength="8"
          value={nickName}
        ></Input>
        <button
          disabled={nickName.length === 0}
          onClick={() => dispatch(nickNameAction(nickName))}
        >
          중복확인
        </button>
      </InputContainer>
    </>
  );
};

export default React.memo(NickNameInput);

const Input = styled.input`
  margin-bottom: 15px;
`;

const InputTitle = styled.span`
  margin: 0px 0 5px 0;
  font-size: 10px;
`;

const InputContainer = styled.div`
  display: flex;
`;
