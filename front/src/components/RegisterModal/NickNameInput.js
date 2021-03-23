import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Input = styled.input`
  margin-bottom: 15px;
`;

const InputTitle = styled.span`
  margin: 0px 0 5px 0;
  font-size: 10px;
`;

const NickNameInput = () => {
  const dispatch = useDispatch();
  const isDouble = useSelector((state) => state.doubleCheckReducer.isDouble);
  const [nickNameVaild, setNickNameVaild] = useState(false);
  const [nickName, setNickName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const checkSpc = /[~!@#$%^&*()_+|<>?:{}]/;
  const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
  const onNickNameDoubleCheck = (e) => {
    if (checkKor.test(e.target.value) || checkSpc.test(e.target.value)) {
      console.log("한글임, 인클루드해야겠네");
      setIsValid(false);
    } else{
      setIsValid(true);
    }
    setNickName(e.target.value);
    dispatch({
      type: "NICK_DOUBLE_CHECK_REQUEST",
      data: {
        user_nickname: e.target.value,
      },
      isDouble: isDouble,
    });
  };
  return (
    <>
      <InputTitle>Your Nickname</InputTitle>
      {isDouble ? (
        <span>닉네임 중복입니다</span>
      ) : nickName.length > 0 ? (
        isValid ? <span>사용가능한 닉네임입니다.</span> : <span>영문 소문자, 한글만 사용할 수 있습니다.</span>
      ) : (
        <span>사용하실 닉네입을 입력해주세요</span>
      )}
      <Input
        name="nickname"
        onChange={onNickNameDoubleCheck}
        type="text"
        placeholder="Nickname"
        maxlength="8"
        value={nickName}
      ></Input>
    </>
  );
};

export default React.memo(NickNameInput);
