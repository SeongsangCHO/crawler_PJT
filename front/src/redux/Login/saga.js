import {
  all,
  fork,
  call,
  put,
  takeEvery,
  takeLatest,
  delay,
} from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

} from "../actions/registerAction";

import axios from "axios";

const loginURL = "http://localhost/login";

function loginAPI(loginData) {
  console.log("loginAPI in saga");

  return axios.post(loginURL, loginData, {
    withCredentials: true,
  });
}



function* loginRequst(action) {
  try {
    console.log("loginRequest in saga");
    const result = yield call(loginAPI, action.data);
    console.log(result.status);
    if (result.status == 200) {
      yield put({ type: LOGIN_SUCCESS, isLogined: true });
    }
  } catch (err) {
    alert("아이디 또는 비밀번호를 다시 확인해주세요");
    yield put({ type: LOGIN_FAILURE, isLogined: false });
    console.error(err);
  }
}

export default function* watchLogin() {
  console.log("watch Login");
  yield takeLatest(LOGIN_REQUEST, loginRequst);
}
