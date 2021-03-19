import { reloadURL } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";

import { RELOAD_SUCCESS, RELOAD_FAILURE } from "../actions/Action";
function reloadCrawlerAPI(linkTitle) {
  //여기까지 잘 전달되는데..
  //객체형태로 전달해주어야하는군,.
  return axios.post(
    reloadURL,
    { linkTitle },
    {
      withCredentials: true,
    }
  );
}

function* reloadCrawler(action) {
  try {
    const result = yield call(reloadCrawlerAPI, action.linkTitle);
    if (result.status == 200) {
      yield put({
        type: RELOAD_SUCCESS,
        isReloaded: true,
        linkTitle: action.linkTitle,
      });
    }
  } catch (error) {
    console.error(error);
    yield put({ type: RELOAD_FAILURE, isReloaded: false });
  }
}

export { reloadCrawler };
