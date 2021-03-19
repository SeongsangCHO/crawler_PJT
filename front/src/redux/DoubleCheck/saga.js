import { push } from "react-router-redux";
import {
  all,
  fork,
  call,
  put,
  takeEvery,
  takeLatest,
  delay,
} from "redux-saga/effects";
import {
  NICK_DOUBLE_CHECK_REQUEST,
  NICK_DOUBLE_CHECK_SUCCESS,
  NICK_DOUBLE_CHECK_FAILURE,
} from "../actions/Action";

import axios from "axios";


const doubleCheckURL = "http://localhost/doublecheck";

function doubleCheckAPI(nickNameData) {
  console.log("doubleCheckAPI in saga");

  return axios.post(doubleCheckURL, nickNameData, {
    withCredentials: true,
  });
}


function* nickNameDoubleCheck(action) {
  try {
    console.log("getNickName in saga");
    const result = yield call(doubleCheckAPI, action.data);
    if (result.status === 200) {
      yield put({
        type: NICK_DOUBLE_CHECK_SUCCESS,
        data: action.data,
        isDouble: true,
      });

      alert("사용하실 수 있는 닉네임입니다.");
    }
  } catch (err) {
    console.error(err);
    yield put({ type: NICK_DOUBLE_CHECK_FAILURE, data: err, isDouble: false });
    alert("닉네임이 이미 존재해요!");
  }
}

export default function* watchNickNameDoubleCheck() {
  console.log("watch getNickName from server");
  //서버로 post로 닉네임 던진다음, select로 중복체크함
  //없으면 200상태코드 반환, 있으면 4xx에러 반환. failure에서 console.찍기
  yield takeLatest(NICK_DOUBLE_CHECK_REQUEST, nickNameDoubleCheck);
}

