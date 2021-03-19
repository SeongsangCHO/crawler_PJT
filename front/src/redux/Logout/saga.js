import { logoutURL } from "../api";
import { put } from "redux-saga/effects";
import axios from "axios";
 
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../actions/Action";

function logoutAPI() {
  console.log("logoutAPI in saga");

  return axios.get(logoutURL, {
    withCredentials: true,
  });
}

function* logoutRequest(action) {
  try {
    console.log("logoutRequest in saga");
    const result = yield logoutAPI(logoutAPI);
    console.log(result);
    if (result.status == 200) {
      yield put({
        type: LOGOUT_SUCCESS,
        message: "SUCCESS",
      });
    }
  } catch (err) {
    yield put({ type: LOGOUT_FAILURE, message: err.message });
    console.error(err);
  }
}

export { logoutAPI, logoutRequest };
