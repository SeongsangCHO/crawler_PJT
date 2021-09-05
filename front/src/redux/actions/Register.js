import { NICK_DOUBLE_CHECK_REQUEST, SIGN_UP_REQUEST } from "./Action";

export const requestSignUp = ({ nickName, password }) => {
  return {
    type: SIGN_UP_REQUEST,
    data: {
      nickName,
      password,
    },
  };
};

export const requestNicknameDoubleCheck = (nickName) => {
  return {
    type: NICK_DOUBLE_CHECK_REQUEST,
    nickName,
  };
};
