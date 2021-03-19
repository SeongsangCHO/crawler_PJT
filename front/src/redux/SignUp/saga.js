import { registerURL } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "../actions/Action";

function signUpAPI(signUpData) {
  console.log("signUpAPI in saga");
  return axios.post(registerURL, signUpData, {
    withCredentials: true,
  });
}

function* signUp(action) {
  try {
    console.log("signUp in saga");
    const result = yield call(signUpAPI, action.data);
    // yield put(registerSuccess(action.data)); //액션호출안해두되남.
    //signUpAPI 를 호출하고 돌아오는 데이터도 받는다.

    //성공하면 redirect해야하는데.. succeess를 어떻게 기다리지

    // yield call(forwardTo, "/");
    // yield put(push('/'));

    //post요청이 성공했을 때
    //history에 uri는 변경이되는데 컴포넌트가 안바뀌네
    console.log(result.status);

    if (result.status === 200) {
      yield put({ type: SIGN_UP_SUCCESS, data: action.data });
      console.log("가입데이터 요청완료");
    }
  } catch (err) {
    console.log(err);
    // yield put(registerFailure());
    yield put({ type: SIGN_UP_FAILURE, data: err });
  }
}

export { signUp };
