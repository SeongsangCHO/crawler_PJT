import { crawlURL } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";

import {
  RUN_CRAWLER_REQUEST,
  RUN_CRAWLER_SUCCESS,
  RUN_CRAWLER_FAILURE,
} from "../actions/ActionType";

function runCrawlerAPI(currentLinkTitle) {
  //여기까지 잘 전달되는데..
  //객체형태로 전달해주어야하는군,.
  return axios.post(
    crawlURL,
    { currentLinkTitle },
    {
      withCredentials: true,
    }
  );
}

function* runCrawler(action) {
  try {
    const result = yield call(runCrawlerAPI, action.currentLinkTitle);
    console.log(result);
    if (result.status == 200) {
      yield put({
        type: RUN_CRAWLER_SUCCESS,
        currentLinkTitle: action.currentLinkTitle,
        isCrawled: true,
      });
    }
  } catch (error) {
    console.error(error);
    yield put({ type: RUN_CRAWLER_FAILURE });
  }
}

export { runCrawlerAPI, runCrawler };
