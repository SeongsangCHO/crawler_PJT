import InputLabel from "components/common/InputLabel";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "components/common/Button";
import { requestNicknameDoubleCheck } from "redux/actions/Register";

const NickNameInput = () => {
  const dispatch = useDispatch();
  const { isDouble, loading } = useSelector((state) => state.registerReducer);
  const [nickName, setNickName] = useState("");
  const [validText, setValidText] = useState("사용하실 닉네임을 입력해주세요.");
  const [isValid, setIsValid] = useState(true);
  const regex = /[^ㄱ-ㅎ|^가-힣|^a-z|^A-Z]/;

  useEffect(() => {
    if (isDouble && isValid) {
      setValidText("닉네임을 확인해주세요.");
      setIsValid(false);
    } else {
      setValidText("사용가능");
      setIsValid(true);
    }
  }, [isDouble]);
  const nickNameValidTest = (nickName) => {
    return regex.test(nickName);
  };

  const onNickNameDoubleCheck = (e) => {
    const { value } = e.target;
    if (nickNameValidTest(value)) {
      setIsValid(false);
      setValidText("영문, 한글만 사용할 수 있습니다");
    } else {
      setValidText("중복확인을 해주세요.");
      setIsValid(true);
    }
    setNickName(value);
  };
  return (
    <>
      <InputLabel>Your Nickname</InputLabel>
      <ValidationNotification>{validText}</ValidationNotification>
      <InputContainer>
        <Input
          isValid={isValid}
          name="nickname"
          onChange={onNickNameDoubleCheck}
          type="text"
          placeholder="Nickname"
          maxlength="8"
          value={nickName}
        ></Input>
        <NickNameDoubleCheckButton
          disabled={nickName.length === 0 && isValid && !isDouble}
          onClick={() => dispatch(requestNicknameDoubleCheck(nickName))}
          type="button"
        >
          중복확인
        </NickNameDoubleCheckButton>
      </InputContainer>
    </>
  );
};

export default React.memo(NickNameInput);

const ValidationNotification = styled.span``;
const NickNameDoubleCheckButton = styled(Button)`
  transition: 0.2s;
  line-height: 10px;
  color: white;
  width: 20%;
  border: none;
  font-size: 0.8em;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: 10px;
  &:disabled {
    opacity: 0.4;
  }
`;
const Input = styled.input`
  width: 100%;
  border: 1px solid ${(props) => (!props.isValid ? "red" : "green")};
  &:focus-visible {
    outline: none;
  }
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;
