import {
  linkDataApiCallURL,
  deleteCardURL,
  requestGet,
  getlinkCardListURL,
} from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LINK_DATA_SUCCESS,
  LINK_DATA_FAILURE,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  GET_LINK_CARD_LIST_SUCCESS,
} from "../actions/ActionType";

function getLinkCardAPI(id) {
  return requestGet({
    url: getlinkCardListURL + `/${id}`,
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}
function* getLinkCardList(action) {
  console.log(action);

  try {
    const res = yield call(getLinkCardAPI, action.id);
    console.log(res);
    yield put({
      type: GET_LINK_CARD_LIST_SUCCESS,
      data: res.data.linkCardList,
    });
  } catch (e) {
    console.error(e);
  }
}

function getLinkDataAPI() {
  return requestGet({
    url: linkDataApiCallURL,
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}

function* getLinkData(action) {
  try {
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

function deleteCardAPI(deleteId) {
  return axios.delete(`${deleteCardURL}/${deleteId}`, {
    withCredentials: true,
  });
}

function* deleteCardRequest(action) {
  try {
    const res = yield call(deleteCardAPI, action.deleteId);

    if (!res.data.ok) {
      throw new Error("delete Request Error");
    } else {
      yield put({
        type: DELETE_CARD_SUCCESS,
        isDeleted: true,
        deletedId: action.deleteId,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_CARD_FAILURE,
      isDeleted: false,
    });
  }
}

export { getLinkData, deleteCardRequest, getLinkCardList };
