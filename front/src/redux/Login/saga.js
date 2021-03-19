import { loginURL } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/Action";


function loginAPI(loginData) {
  console.log("loginAPI in saga");

  return axios.post(loginURL, loginData, {
    withCredentials: true,
  });
}

function* loginRequest(action) {
  try {
    console.log("loginRequest in saga");
    const result = yield call(loginAPI, action.data);
    console.log(result);
    if (result.status == 200) {
      yield put({
        type: LOGIN_SUCCESS,
        user_nickname: action.data.user_nickname,
        isLogined: true,
        token: result.data.token,
      });
    }
  } catch (err) {
    yield put({ type: LOGIN_FAILURE, isLogined: false });
    console.error(err);
  }
}

export { loginRequest };
