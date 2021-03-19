import { addLinkURL } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";

import { ADD_LINK_SUCCESS, ADD_LINK_FAILURE } from "../actions/Action";

function addLinkAPI(linkData) {
  console.log("call addLinkAPI");

  return axios.post(addLinkURL, linkData, {
    withCredentials: true,
  });
}

function* addLink(action) {
  try {
    const result = yield call(addLinkAPI, action.data);
    if (result.status == 200) {
      console.log("addLink 성공");
      yield put({ type: ADD_LINK_SUCCESS, data: action.data });
    }
  } catch (error) {
    console.error(error);
    console.log("addLink 실패");
    yield put({ type: ADD_LINK_FAILURE });
  }
}

export { addLink };
