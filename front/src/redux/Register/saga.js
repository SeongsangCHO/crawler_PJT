import { doubleCheckURL, registerURL } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import {
  NICK_DOUBLE_CHECK_SUCCESS,
  NICK_DOUBLE_CHECK_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../actions/Action";

function doubleCheckAPI(data) {
  console.log(data);

  return axios.post(doubleCheckURL, data, {
    withCredentials: true,
  });
}

function* nickNameDoubleCheck(action) {
  try {
    const result = yield call(doubleCheckAPI, action);
    if (result.status === 200) {
      yield put({
        type: NICK_DOUBLE_CHECK_SUCCESS,
        nickName: action.nickName,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({ type: NICK_DOUBLE_CHECK_FAILURE });
  }
}

function signUpAPI(signUpData) {
  return axios.post(registerURL, signUpData, {
    withCredentials: true,
  });
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    if (result.status === 200) {
      yield put({ type: SIGN_UP_SUCCESS });
    }
  } catch (err) {
    console.log(err);
    yield put({ type: SIGN_UP_FAILURE, data: err });
  }
}
export { nickNameDoubleCheck, signUp };
