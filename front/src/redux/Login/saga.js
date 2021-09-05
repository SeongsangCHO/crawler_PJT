import { logoutURL, loginURL } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";

import {
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/Action";

function logoutAPI() {
  return axios.get(logoutURL, {
    withCredentials: true,
  });
}
function loginAPI(loginData) {
  return axios.post(loginURL, loginData, {
    withCredentials: true,
  });
}

function* loginRequest(action) {
  try {
    const result = yield call(loginAPI, action.data);
    if (result.status == 200) {
      yield put({
        type: LOGIN_SUCCESS,
        nickName: action.data.nickName,
        isLogined: true,
        token: result.data.token,
      });
      sessionStorage.setItem("token", JSON.stringify(result.data.token));
    }
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, isLogined: false });
    console.error(err);
  }
}
function* logoutRequest() {
  try {
    const result = yield logoutAPI(logoutAPI);
    if (result.status == 200) {
      yield put({
        type: LOGOUT_SUCCESS,
        message: "SUCCESS",
      });
      sessionStorage.removeItem("token");
    }
  } catch (err) {
    yield put({ type: LOGOUT_FAILURE, message: err.message });
    console.error(err);
  }
}

export { logoutAPI, logoutRequest, loginRequest };
