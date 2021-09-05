import { doubleCheckURL } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import {
  NICK_DOUBLE_CHECK_SUCCESS,
  NICK_DOUBLE_CHECK_FAILURE,
} from "../actions/Action";

function doubleCheckAPI(nickNameData) {
  return axios.post(doubleCheckURL, nickNameData, {
    withCredentials: true,
  });
}

function* nickNameDoubleCheck(action) {
  try {
    const result = yield call(doubleCheckAPI, action);
    if (result.status === 200) {
      yield put({
        type: NICK_DOUBLE_CHECK_SUCCESS,
        nickName: action.nickName,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({ type: NICK_DOUBLE_CHECK_FAILURE });
  }
}

export { nickNameDoubleCheck };
