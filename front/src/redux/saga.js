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
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "./actions/registerAction";

import axios from "axios";

const localURL = "http://localhost/register";

//비동기 작업을 3단계로 세분화하는 것 = > 리액트 사가

// *_REQUEST 비동기 요청
// *_SUCCESS 비동기 요청성공
// *_FAILURE 비동기 요청실패

function signUpAPI(signUpData) {
  console.log("signupAPI in saga");
  return axios.post(localURL, signUpData, {
    withCredentials: true,
  });
}
function* signUp(action) {
  try {
    console.log("signUp in saga");
    const result = yield call(signUpAPI, action.data);
    //signUpAPI 를 호출하고 돌아오는 데이터도 받는다.
    yield put({ type: SIGN_UP_SUCCESS, user_data: action.data });
  } catch (err) {
    console.log(err);
    yield put({ type: SIGN_UP_FAILURE, user_data: err.response.data });
  }
}
function* watchSignUp() {
  console.log("watch Sign UP");
  yield takeEvery(SIGN_UP_REQUEST, signUp); //리듀서 감지
}

export default function* rootSaga() {
  yield all([fork(watchSignUp)]);
}
