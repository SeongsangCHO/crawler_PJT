import {
  linkDataApiCallURL,
  deleteCardURL,
  requestGet,
  getlinkCardListURL,
  getProductsListURL,
  getCardsURL,
} from "../api";
import { put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LINK_DATA_SUCCESS,
  LINK_DATA_FAILURE,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  GET_LINK_CARD_LIST_SUCCESS,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCTS_LIST_FAILURE,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAILURE,
} from "../actions/ActionType";

function getLinkCardAPI(id) {
  return requestGet({
    url: getlinkCardListURL + `/${id}`,
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}
function* getLinkCardList(action) {
  try {
    const res = yield call(getLinkCardAPI, action.id);
    yield put({
      type: GET_LINK_CARD_LIST_SUCCESS,
      data: res.data.linkCardList,
      selectedCardId: action.id,
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
    yield put({
      type: DELETE_CARD_FAILURE,
      isDeleted: false,
    });
  }
}

function getProductsListAPI() {
  return requestGet({
    url: getProductsListURL,
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}
function* getProductsList() {
  console.log("getProductsList");

  try {
    const result = yield call(getProductsListAPI);
    console.log(result);

    if (result.status == 200) {
      yield put({
        type: GET_PRODUCTS_LIST_SUCCESS,
        products: result.data.products,
      });
    }
  } catch (error) {
    yield put({
      type: GET_PRODUCTS_LIST_FAILURE,
    });

    console.error(error);
  }
}

function getCardsAPI() {
  return requestGet({
    url: getCardsURL,
    accessToken: JSON.parse(sessionStorage.getItem("token")),
  });
}
function* getCards() {
  try {
    const result = yield call(getCardsAPI);
    if (result.status == 200) {
      yield put({
        type: GET_CARDS_SUCCESS,
        cards: result.data.cards,
      });
    }
  } catch (error) {
    yield put({
      type: GET_CARDS_FAILURE,
    });
    console.error(error);
  }
}

export {
  getCards,
  getLinkData,
  deleteCardRequest,
  getLinkCardList,
  getProductsList,
};
