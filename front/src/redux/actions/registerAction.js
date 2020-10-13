import axios from "axios";
const localURL = "http://localhost/register";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export function registerRequest(data) {
  console.log('액션 호출');
  console.log(data);
  return {
    type: SIGN_UP_REQUEST,
    data : data,
  };
}
export function registerSuccess(data) {
  return {
    type: SIGN_UP_SUCCESS,
    data : data,
  };
}
export function registerFailure(error) {
  return {
    type: SIGN_UP_FAILURE,
    error,
  };
}
