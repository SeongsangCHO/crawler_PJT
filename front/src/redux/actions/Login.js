import { LOGIN_REQUEST, LOGOUT_REQUEST } from "./Action";

export const requestLogin = ({ nickName, password }) => {
  return {
    type: LOGIN_REQUEST,
    data: {
      nickName,
      password,
    },
  };
};

export const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};
