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
} from "./actions/registerAction";
import doubleCheckSaga from "../redux/DoubleCheck/saga.js";
import axios from "axios";

const registerURL = "http://localhost/register";
const loginURL = "http://localhost/login";
const addCategoryURL = "http://localhost/addcategory";
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


function loginAPI(loginData) {
  console.log("loginAPI in saga");

  return axios.post(loginURL, loginData, {
    withCredentials: true,
  });
}

function addCategoryAPI(category){
  console.log("addCategoryAPI in saga");
  
  return axios.post(addCategoryURL, {category}, {
    withCredentials:true,
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

function* addCategory(action) {
  try {
    console.log("addCategory in saga");
    console.log(action.category);
    const result = yield call(addCategoryAPI, action.category);
    
    if (result.status == 200){
      yield put({type: ADD_CATEGORY_SUCCESS, category: action.category});
      alert("요청성공")
    }
  } catch (err) {
    yield put ({type: ADD_CATEGORY_FAILURE, err: err});
    console.error(err);
  }
}

//액션 type - SIGN_UP_REQUEST가 들어올떄까지 기다림
function* watchSignUp() {
  console.log("watch Sign UP");
  yield takeLatest(SIGN_UP_REQUEST, signUp); //리듀서 감지
}


function* watchLogin() {
  console.log("watch Login");
  yield takeLatest(LOGIN_REQUEST, loginRequst);
}

function* watchAddCategory() {
  console.log("watch AddCategory");
  yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
}

//1번 랜더링시 watch Sign up이 수행될떄까지 기다림
export default function* rootSaga() {
  yield all([
    fork(watchSignUp),
    fork(doubleCheckSaga.watchNickNameDoubleCheck),
    fork(watchLogin),
    fork(watchAddCategory),
  ]);
}
