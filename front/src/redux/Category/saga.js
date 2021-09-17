import {
  addCategoryURL,
  requestPost,
  getCategoriesURL,
  requestGet,
} from "../api";
import { put, call } from "redux-saga/effects";
import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_SUCCESS,
} from "../actions/ActionType";

function getCategoriesAPI() {
  return requestGet({
    url: getCategoriesURL,
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}

function addCategoryAPI(category) {
  return requestPost({
    url: addCategoryURL,
    body: { category },
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}

function* addCategory(action) {
  try {
    const result = yield call(addCategoryAPI, action.category);

    if (result.status === 200) {
      yield put({
        type: ADD_CATEGORY_SUCCESS,
        category: { ...result.data },
        isAddCategory: true,
      });
    }
  } catch (err) {
    yield put({ type: ADD_CATEGORY_FAILURE, err: err });
    console.error(err);
  }
}

function* getCategories() {
  try {
    const result = yield call(getCategoriesAPI);
    if (result.status === 200) {
      yield put({
        type: GET_CATEGORY_SUCCESS,
        categories: result.data.categories,
      });
    }
  } catch (e) {
    console.log(e);

    alert("권한이 없습니다.");
    sessionStorage.clear("token");
    window.location.href = "http://localhost:3000/";
    yield put({ type: GET_CATEGORY_FAILURE });
  }
}

export { addCategory, getCategories };
