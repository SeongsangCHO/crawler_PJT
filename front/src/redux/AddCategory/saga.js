import { addCategoryURL } from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import { ADD_CATEGORY_SUCCESS, ADD_CATEGORY_FAILURE } from "../actions/Action";

function addCategoryAPI(category) {
  console.log("addCategoryAPI in saga");

  return axios.post(
    addCategoryURL,
    { category },
    {
      withCredentials: true,
    }
  );
}

function* addCategory(action) {
  try {
    console.log("addCategory in saga");
    console.log(action.category);
    const result = yield call(addCategoryAPI, action.category);

    if (result.status == 200) {
      yield put({
        type: ADD_CATEGORY_SUCCESS,
        category: action.category,
        isAddCategory: true,
      });
      alert("요청성공");
    }
  } catch (err) {
    alert("로그인이 필요합니다");
    yield put({ type: ADD_CATEGORY_FAILURE, err: err });
    console.error(err);
  }
}

export { addCategory };
