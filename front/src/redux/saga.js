import { all, fork, takeLatest } from "redux-saga/effects";

import {
  SIGN_UP_REQUEST,
  LOGIN_REQUEST,
  ADD_CATEGORY_REQUEST,
  NICK_DOUBLE_CHECK_REQUEST,
  LINK_DATA_REQUEST,
  GET_CATEGORY_REQUEST,
  ADD_CARD_REQUEST,
  RUN_CRAWLER_REQUEST,
  RELOAD_REQUEST,
  LOGOUT_REQUEST,
  DELETE_CARD_REQUEST,
  GET_PRODUCTS_LIST_REQUEST,
  GET_CARDS_REQUEST,
  GET_CRAWL_DATA_LIST_REQUEST,
} from "./actions/ActionType";
import { logoutRequest, loginRequest } from "./Login/saga";
import {
  getLinkData,
  deleteCardRequest,
  getProductsList,
  getCards,
  addCard,
} from "./LinkData/saga";
import { nickNameDoubleCheck, signUp } from "./Register/saga";
import { addCategory, getCategories } from "./Category/saga";
import { getCrawlList, runCrawler } from "./Crawl/saga";
import { reloadCrawler } from "./ReloadCrawl/saga";

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
// function* watchGetCategory() {
//   yield takeLatest(GET_CATEGORY_REQUEST, getCategory);
// }

// function* watchAddLink() {
//   yield takeLatest(ADD_LINK_REQUEST, addLink);
// }

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

function* watchGetCategories() {
  yield takeLatest(GET_CATEGORY_REQUEST, getCategories);
}

// function* watchGetLinkCardList() {
//   yield takeLatest(GET_LINK_CARD_LIST_REQUEST, getLinkCardList);
// }
function* watchGetProductsList() {
  yield takeLatest(GET_PRODUCTS_LIST_REQUEST, getProductsList);
}

function* watchGetCards() {
  yield takeLatest(GET_CARDS_REQUEST, getCards);
}
function* watchAddCard() {
  yield takeLatest(ADD_CARD_REQUEST, addCard);
}
function* watchGetCrawlList() {
  yield takeLatest(GET_CRAWL_DATA_LIST_REQUEST, getCrawlList);
}
//1번 랜더링시 watch Sign up이 수행될떄까지 기다림
export default function* rootSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchNickNameDoubleCheck),
    fork(watchLogin),
    fork(watchAddCategory),
    fork(watchGetLinkData),
    fork(watchRunCrawler),
    fork(watchReloading),
    fork(watchLogout),
    fork(watchDeleteCard),
    fork(watchGetCategories),
    fork(watchGetProductsList),
    fork(watchGetCards),
    fork(watchAddCard),
    fork(watchGetCrawlList),
  ]);
}
