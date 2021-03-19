import { linkDataApiCallURL } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import { LINK_DATA_SUCCESS, LINK_DATA_FAILURE } from "../actions/Action";

function getLinkDataAPI() {
  console.log("getLinkDataAPI in saga");

  return axios.get(linkDataApiCallURL, {
    withCredentials: true,
  });
}

function* getLinkData(action) {
  try {
    console.log("getlinkData");
    const result = yield call(getLinkDataAPI, action.data);
    if (result.status == 200) {
      yield put({
        type: LINK_DATA_SUCCESS,
        data: result.data,
        isCalled: true,
        message: action.message,
      });
    }
  } catch (error) {
    yield put({
      type: LINK_DATA_FAILURE,
      err: error.message,
      isCalled: false,
      message: action.message,
    });

    console.error(error);
  }
}

export {getLinkData};