import { push } from "react-router-redux";
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
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  NICK_DOUBLE_CHECK_REQUEST,
  NICK_DOUBLE_CHECK_SUCCESS,
  NICK_DOUBLE_CHECK_FAILURE,
  LINK_DATA_REQUEST,
  LINK_DATA_SUCCESS,
  LINK_DATA_FAILURE,
} from "./actions/registerAction";

import doubleCheckSaga from "../redux/DoubleCheck/saga.js";
import loginSaga from "../redux/Login/saga.js";

import axios from "axios";

const registerURL = "http://localhost/register";
const loginURL = "http://localhost/login";
const addCategoryURL = "http://localhost/addcategory";
const linkDataApiCallURL = "http://localhost/api/mylink";

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
      alert("가입성공");
    }
  } catch (err) {
    console.log(err);
    // yield put(registerFailure());
    yield put({ type: SIGN_UP_FAILURE, data: err });
  }
}

//액션 type - SIGN_UP_REQUEST가 들어올떄까지 기다림
function* watchSignUp() {
  console.log("watch Sign UP");
  yield takeLatest(SIGN_UP_REQUEST, signUp); //리듀서 감지
}

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
function* watchLogin() {
  console.log("watch Login");
  yield takeLatest(LOGIN_REQUEST, loginRequst);
}

function addCategoryAPI(category) {
  console.log("addCategoryAPI in saga");

  return axios.post(
    addCategoryURL,
    { category },
    {
      withCredentials: true,
    }
  );
}

function* addCategory(action) {
  try {
    console.log("addCategory in saga");
    console.log(action.category);
    const result = yield call(addCategoryAPI, action.category);

    if (result.status == 200) {
      yield put({ type: ADD_CATEGORY_SUCCESS, category: action.category});
      alert("요청성공");
    }
  } catch (err) {
    alert("로그인이 필요합니다");
    yield put({ type: ADD_CATEGORY_FAILURE, err: err });
    console.error(err);
  }
}

function* watchAddCategory() {
  console.log("watch AddCategory");
  yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
}

const doubleCheckURL = "http://localhost/doublecheck";

function doubleCheckAPI(nickNameData) {
  console.log("doubleCheckAPI in saga");

  return axios.post(doubleCheckURL, nickNameData, {
    withCredentials: true,
  });
}

function* nickNameDoubleCheck(action) {
  try {
    console.log("getNickName in saga");
    const result = yield call(doubleCheckAPI, action.data);
    if (result.status === 200) {
      yield put({
        type: NICK_DOUBLE_CHECK_SUCCESS,
        data: action.data,
        isDouble: true,
      });

      alert("사용하실 수 있는 닉네임입니다.");
    }
  } catch (err) {
    console.error(err);
    yield put({ type: NICK_DOUBLE_CHECK_FAILURE, data: err, isDouble: false });
    alert("닉네임이 이미 존재해요!");
  }
}



function* watchNickNameDoubleCheck() {
  console.log("watch getNickName from server");
  //서버로 post로 닉네임 던진다음, select로 중복체크함
  //없으면 200상태코드 반환, 있으면 4xx에러 반환. failure에서 console.찍기
  yield takeLatest(NICK_DOUBLE_CHECK_REQUEST, nickNameDoubleCheck);
}

function getLinkDataAPI(){
  console.log("getLinkDataAPI in saga");

  return axios.get(linkDataApiCallURL, {
    withCredentials: true,
  });
}

function* getLinkData(action) {
  try {
    console.log("getlinkData");
    const result = yield call(getLinkDataAPI, action.data);
    console.log(result);
    if(result.status == 200){
      yield put({type: LINK_DATA_SUCCESS, data:result.data});
    }
  } catch (error) {
    yield put({ type: LINK_DATA_FAILURE, err: error });

    console.error(error);
  }
}

function* watchGetLinkData() {
  console.log("watch CallLinkDataApi from server");
  yield takeLatest(LINK_DATA_REQUEST, getLinkData);
}

//1번 랜더링시 watch Sign up이 수행될떄까지 기다림
export default function* rootSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchNickNameDoubleCheck),
    fork(watchLogin),
    fork(watchAddCategory),
    fork(watchGetLinkData),
  ]);
}
