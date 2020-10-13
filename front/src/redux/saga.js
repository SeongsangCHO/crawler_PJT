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
  registerRequest,
  registerSuccess,
  registerFailure
} from "./actions/registerAction";

import axios from "axios";

const localURL = "http://localhost/register";

//비동기 작업을 3단계로 세분화하는 것 = > 리액트 사가

// *_REQUEST 비동기 요청
// *_SUCCESS 비동기 요청성공
// *_FAILURE 비동기 요청실패

function signUpAPI(signUpData) {
  console.log("signUpAPI in saga");
  return axios.post(localURL, signUpData, {
    withCredentials: true,
  });
}
function* signUp(action) {
  try {
    console.log("signUp in saga");
    yield delay(2000);
    const result = yield call(signUpAPI, action.data);
    // yield put(registerSuccess(action.data)); //액션호출안해두되남.
    //signUpAPI 를 호출하고 돌아오는 데이터도 받는다.
    yield put({ type: SIGN_UP_SUCCESS, data: action.data });
    return (result.status);
  } catch (err) {
    console.log(err);
    yield put(registerFailure());
    yield put({ type: SIGN_UP_FAILURE, data: err });
  }
}

//액션 type - SIGN_UP_REQUEST가 들어올떄까지 기다림
function* watchSignUp() {
  console.log("watch Sign UP");
  yield takeEvery(SIGN_UP_REQUEST, signUp); //리듀서 감지
}


//1번 랜더링시 watch Sign up이 수행될떄까지 기다림
export default function* rootSaga() {
  yield all([fork(watchSignUp)]);
}
