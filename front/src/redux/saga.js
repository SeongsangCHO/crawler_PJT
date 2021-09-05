//%s/localhost/34.89..../g
import { all, fork, put, takeLatest } from "redux-saga/effects";

import {
  SIGN_UP_REQUEST,
  LOGIN_REQUEST,
  ADD_CATEGORY_REQUEST,
  NICK_DOUBLE_CHECK_REQUEST,
  LINK_DATA_REQUEST,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
  ADD_LINK_REQUEST,
  RUN_CRAWLER_REQUEST,
  RELOAD_REQUEST,
  LOGOUT_REQUEST,
  DELETE_CARD_REQUEST,
} from "./actions/Action";
import { logoutRequest, loginRequest } from "./Login/saga";
import { runCrawler } from "./RunCrawler/saga";
import { addLink } from "./AddLink/saga";
import { reloadCrawler } from "./ReloadCrawl/saga";
import { getLinkData, deleteCardRequest } from "./LinkData/saga";
import { signUp } from "./SignUp/saga";
import { nickNameDoubleCheck } from "./Register/saga";
import { addCategory } from "./AddCategory/saga";

//비동기 작업을 3단계로 세분화하는 것 = > 리액트 사가

// *_REQUEST 비동기 요청
// *_SUCCESS 비동기 요청성공
// *_FAILURE 비동기 요청실패

// function forwardTo(location) {
//   history.push(location);
// }

//액션 type - SIGN_UP_REQUEST가 들어올떄까지 기다림
function* getCategory(action) {
  try {
    yield put({
      type: GET_CATEGORY_SUCCESS,
      currentCategory: action.currentCategory,
    });
  } catch (err) {
    yield put({
      type: GET_CATEGORY_FAILURE,
      currentCategory: action.currentCategory,
    });
    console.error(err);
  }
}
function* watchSignUp() {
  console.log("watch Sign UP");
  yield takeLatest(SIGN_UP_REQUEST, signUp); //리듀서 감지
}

function* watchAddCategory() {
  console.log("watch AddCategory");
  yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
}

function* watchNickNameDoubleCheck() {
  console.log("watch getNickName from server");
  yield takeLatest(NICK_DOUBLE_CHECK_REQUEST, nickNameDoubleCheck);
}

function* watchLogin() {
  console.log("watch Login");
  yield takeLatest(LOGIN_REQUEST, loginRequest);
}
function* watchGetLinkData() {
  console.log("watch CallLinkDataApi from server");
  yield takeLatest(LINK_DATA_REQUEST, getLinkData);
}
function* watchGetCategory() {
  console.log("watch getCategory");
  yield takeLatest(GET_CATEGORY_REQUEST, getCategory);
}

function* watchAddLink() {
  console.log("watch AddLink");
  yield takeLatest(ADD_LINK_REQUEST, addLink);
}

function* watchRunCrawler() {
  console.log("watch Crawler");
  yield takeLatest(RUN_CRAWLER_REQUEST, runCrawler);
}

function* watchReloading() {
  console.log("watch reloading");
  yield takeLatest(RELOAD_REQUEST, reloadCrawler);
}

function* watchDeleteCard() {
  console.log("watch deleteCard");
  yield takeLatest(DELETE_CARD_REQUEST, deleteCardRequest);
}

function* watchLogout() {
  console.log("watch reloading");
  yield takeLatest(LOGOUT_REQUEST, logoutRequest);
}

//1번 랜더링시 watch Sign up이 수행될떄까지 기다림
export default function* rootSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchNickNameDoubleCheck),
    fork(watchLogin),
    fork(watchAddCategory),
    fork(watchGetLinkData),
    fork(watchGetCategory),
    fork(watchAddLink),
    fork(watchRunCrawler),
    fork(watchReloading),
    fork(watchLogout),
    fork(watchDeleteCard),
  ]);
}
