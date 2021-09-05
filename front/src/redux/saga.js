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
import { nickNameDoubleCheck, signUp } from "./Register/saga";
import { addCategory } from "./Category/saga";

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
  }
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp); //리듀서 감지
}

function* watchAddCategory() {
  yield takeLatest(ADD_CATEGORY_REQUEST, addCategory);
}

function* watchNickNameDoubleCheck() {
  yield takeLatest(NICK_DOUBLE_CHECK_REQUEST, nickNameDoubleCheck);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
}
function* watchGetLinkData() {
  yield takeLatest(LINK_DATA_REQUEST, getLinkData);
}
function* watchGetCategory() {
  yield takeLatest(GET_CATEGORY_REQUEST, getCategory);
}

function* watchAddLink() {
  yield takeLatest(ADD_LINK_REQUEST, addLink);
}

function* watchRunCrawler() {
  yield takeLatest(RUN_CRAWLER_REQUEST, runCrawler);
}

function* watchReloading() {
  yield takeLatest(RELOAD_REQUEST, reloadCrawler);
}

function* watchDeleteCard() {
  yield takeLatest(DELETE_CARD_REQUEST, deleteCardRequest);
}

function* watchLogout() {
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
