import { logoutURL, loginURL } from "../api";
import { put, call } from "redux-saga/effects";
import { requestPost } from "redux/api";
import {
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/ActionType";

function loginAPI(loginData) {
  console.log(loginData);

  return requestPost({
    url: loginURL,
    body: loginData,
    accessToken: JSON.parse(sessionStorage.getItem("token")),
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
    yield put({
      type: LOGOUT_SUCCESS,
      message: "SUCCESS",
    });
    sessionStorage.clear("token");
  } catch (err) {
    yield put({ type: LOGOUT_FAILURE, message: err.message });
    console.error(err);
  }
}

export { logoutRequest, loginRequest };
