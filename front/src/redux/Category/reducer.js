import { STATUS } from "components/utils/constants";
import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
} from "../actions/ActionType";

const initialState = {
  categories: [],
  isAddCategory: false,
  status: STATUS.request,
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const categoryReducer = (state = initialState, action) => {
  switch (action?.type) {
    case ADD_CATEGORY_REQUEST: {
      return { ...state, isAddCategory: action.isAddCategory };
    }
    case ADD_CATEGORY_SUCCESS: {
      return {
        ...state,
        categories: [...state.categories, action.category],
        isAddCategory: action.isAddCategory,
      };
    }
    case ADD_CATEGORY_FAILURE: {
      return { ...state, isAddCategory: false };
    }
    case GET_CATEGORY_REQUEST: {
      return {
        ...state,
        status: "GET_CATEGORY_" + STATUS.request,
      };
    }
    case GET_CATEGORY_SUCCESS: {
      console.log(action.categories);

      return {
        ...state,
        status: "GET_CATEGORY_" + STATUS.success,
        categories: [...action.categories],
      };
    }
    case GET_CATEGORY_FAILURE: {
      return { ...state, status: "GET_CATEGORY_" + STATUS.failure };
    }
    default:
      return state;
  }
};
export default categoryReducer;
