
import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from "../actions/Action";

const initialState = {
  category:'',
  isAddCategory:false,
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const addCategoryReducer = (state = initialState, action) => {

  switch (action?.type) {
    case ADD_CATEGORY_REQUEST: {
      console.log("add카테고리 REQUEST_리듀서");
      return { ...state, isAddCategory:action.isAddCategory };
    }
    case ADD_CATEGORY_SUCCESS: {
      console.log("add카테고리 SUCCESS_리듀서");
      return { ...state, category: action.category, isAddCategory: action.isAddCategory};
    }
    case ADD_CATEGORY_FAILURE: {
      console.log("add카테고리 FAILURE_리듀서");
      return { ...state, data: {}, isAddCategory: false};
    }
    
    default:
      return state;
  }
};
export default addCategoryReducer;
