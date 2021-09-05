import { addCategoryURL, requestPost } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import { ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE } from "../actions/Action";

function addCategoryAPI(category) {
  console.log("addCategoryAPI in saga");

  return requestPost({
    url: addCategoryURL,
    body: { category },
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}

function* addCategory(action) {
  try {
    const result = yield call(addCategoryAPI, action.category);

    if (result.status == 200) {
      yield put({
        type: ADD_CATEGORY_SUCCESS,
        category: action.category,
        isAddCategory: true,
      });
    }
  } catch (err) {
    alert("로그인이 필요합니다");
    yield put({ type: ADD_CATEGORY_FAILURE, err: err });
    console.error(err);
  }
}

export { addCategory };
