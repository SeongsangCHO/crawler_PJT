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

function getCategoriesAPI(id) {
  return requestGet({
    url: getCategoriesURL,
    body: { id },
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}

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
        category: { ...result.data },
        isAddCategory: true,
      });
    }
  } catch (err) {
    yield put({ type: ADD_CATEGORY_FAILURE, err: err });
    console.error(err);
  }
}

function* getCategories(action) {
  try {
    const result = yield call(getCategoriesAPI, action.id);
    console.log(result);

    if (result.status === 200) {
      yield put({
        type: GET_CATEGORY_SUCCESS,
        categories: result.data.categories,
      });
    }
  } catch (e) {
    yield put({ type: GET_CATEGORY_FAILURE });
  }
}

export { addCategory, getCategories };
