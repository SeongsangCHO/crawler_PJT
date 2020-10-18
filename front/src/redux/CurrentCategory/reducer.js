
import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
} from "../actions/registerAction";

const initialState = {
  currentCategory: '',
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const currentCategoryReducer = (state = initialState, action) => {

  switch (action?.type) {
    case GET_CATEGORY_REQUEST: {
      console.log("GET 카테고리 REQUEST_리듀서");
      return { ...state };
    }
    case GET_CATEGORY_SUCCESS: {
      console.log("GET 카테고리 SUCCESS_리듀서");
      return { ...state, currentCategory: action.currentCategory};
    }
    case GET_CATEGORY_FAILURE: {
      console.log("GET 카테고리 FAILURE_리듀서");
      return { ...state};
    }
    
    default:
      return state;
  }
};
export default currentCategoryReducer;
