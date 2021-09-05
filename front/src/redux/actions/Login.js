import { LOGIN_REQUEST, LOGOUT_REQUEST } from "./Action";

export const requestLogin = ({ nickName, password }) => {
  return {
    type: LOGIN_REQUEST,
    data: {
      user_nickname: nickName,
      user_password: password,
    },
  };
};

export const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};
