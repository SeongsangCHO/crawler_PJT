import { push } from 'react-router-redux';
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
  registerFailure,
  NICK_DOUBLE_CHECK_REQUEST,
  NICK_DOUBLE_CHECK_SUCCESS,
  NICK_DOUBLE_CHECK_FAILURE
} from "./actions/registerAction";

import axios from "axios";

const registerURL = "http://localhost/register";
const doubleCheckURL = "http://localhost/doublecheck"
//비동기 작업을 3단계로 세분화하는 것 = > 리액트 사가

// *_REQUEST 비동기 요청
// *_SUCCESS 비동기 요청성공
// *_FAILURE 비동기 요청실패

// function forwardTo(location) {
//   history.push(location);
// }

function signUpAPI(signUpData) {
  console.log("signUpAPI in saga");
  return axios.post(registerURL, signUpData, {
    withCredentials: true,
  });
}

function doubleCheckAPI(nickNameData) {
  console.log("doubleCheckAPI in saga");
  
  return axios.post(doubleCheckURL, nickNameData, {
    withCredentials: true,
  });
}
function* signUp(action) {
  try {

    console.log("signUp in saga");
    const result = yield call(signUpAPI, action.data);
    // yield put(registerSuccess(action.data)); //액션호출안해두되남.
    //signUpAPI 를 호출하고 돌아오는 데이터도 받는다.
    yield put({ type: SIGN_UP_SUCCESS, data: action.data });
    
    //성공하면 redirect해야하는데.. succeess를 어떻게 기다리지

    // yield call(forwardTo, "/");
    // yield put(push('/'));

    //post요청이 성공했을 때
    //history에 uri는 변경이되는데 컴포넌트가 안바뀌네
    if (result.status === 200) { 
      console.log('가입데이터 요청완료');
      alert('가입성공');
    }
  } catch (err) {
    console.log(err);
    // yield put(registerFailure());
    yield put({ type: SIGN_UP_FAILURE, data: err });
  }
}


function* nickNameDoubleCheck(action){
  try{
    console.log("getNickName in saga");
    const result = yield call(doubleCheckAPI, action.data);
    if (result.status === 200){
      alert('사용하실 수 있는 닉네임입니다.');
    }
  }
  catch(err){
    console.error(err);
    yield put({ type: NICK_DOUBLE_CHECK_FAILURE, data: err });
    alert('닉네임이 이미 존재해요!');
  }
}






//액션 type - SIGN_UP_REQUEST가 들어올떄까지 기다림
function* watchSignUp() {
  console.log("watch Sign UP");
  yield takeLatest(SIGN_UP_REQUEST, signUp); //리듀서 감지
}

function* watchNickNameDoubleCheck(){
  console.log("watch getNickName from server");
  //서버로 post로 닉네임 던진다음, select로 중복체크함
  //없으면 200상태코드 반환, 있으면 4xx에러 반환. failure에서 console.찍기
  yield takeLatest(NICK_DOUBLE_CHECK_REQUEST, nickNameDoubleCheck);
}

//1번 랜더링시 watch Sign up이 수행될떄까지 기다림
export default function* rootSaga() {
  yield all([fork(watchSignUp), fork(watchNickNameDoubleCheck)]);
}
