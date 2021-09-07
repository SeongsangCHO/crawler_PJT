import {
  crawlURL,
  getCrawListlURL,
  reloadURL,
  requestGet,
  requestPost,
} from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";

import {
  RUN_CRAWLER_SUCCESS,
  RUN_CRAWLER_FAILURE,
  RELOAD_SUCCESS,
  RELOAD_FAILURE,
  GET_CRAWL_DATA_LIST_FAILURE,
  GET_CRAWL_DATA_LIST_SUCCESS,
} from "../actions/ActionType";

function getCrawlListAPI(id) {
  return requestGet({
    url: `${getCrawListlURL}/${id}`,
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}

function* getCrawlList(action) {
  try {
    const result = yield call(getCrawlListAPI, action.id);
    console.log(result);

    yield put({
      type: GET_CRAWL_DATA_LIST_SUCCESS,
      data: result.data.crawlList,
      id: action.id,
    });
  } catch (e) {
    yield put({ type: GET_CRAWL_DATA_LIST_FAILURE });
  }
}

function runCrawlerAPI(currentLinkTitle) {
  return requestPost({
    url: crawlURL,
    body: { currentLinkTitle },
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}

function* runCrawler(action) {
  console.log(action, "runcrawl");

  try {
    const result = yield call(runCrawlerAPI, action.currentLinkTitle);
    if (result.status === 200) {
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

function reloadCrawlerAPI(linkTitle) {
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
    if (result.status === 200) {
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

export { runCrawlerAPI, runCrawler, getCrawlList };
