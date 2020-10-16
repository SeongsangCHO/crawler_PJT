import axios from "axios";
const localURL = "http://localhost/register";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const NICK_DOUBLE_CHECK_REQUEST = "NICK_DOUBLE_CHECK_REQUEST";
export const NICK_DOUBLE_CHECK_SUCCESS = "NICK_DOUBLE_CHECK_SUCCESS";
export const NICK_DOUBLE_CHECK_FAILURE = "NICK_DOUBLE_CHECK_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const ADD_CATEGORY_REQUEST = "ADD_CATEGORY_REQUEST";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_FAILURE = "ADD_CATEGORY_FAILURE";
export function registerRequest(data) {
  console.log("액션 생성함수");
  console.log(data);
  return {
    type: SIGN_UP_REQUEST,
    data: data,
  };
}
export function registerSuccess(data) {
  console.log("액션 success");
  console.log(data);
  console.log("액션 success return");

  return {
    type: SIGN_UP_SUCCESS,
    data: data,
  };
}
export function registerFailure(error) {
  return {
    type: SIGN_UP_FAILURE,
    error,
  };
}
