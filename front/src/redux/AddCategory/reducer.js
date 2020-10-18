
import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from "../actions/registerAction";

const initialState = {
  category:'',
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const addCategoryReducer = (state = initialState, action) => {

  switch (action?.type) {
    case ADD_CATEGORY_REQUEST: {
      console.log("add카테고리 REQUEST_리듀서");
      return { ...state };
    }
    case ADD_CATEGORY_SUCCESS: {
      console.log("add카테고리 SUCCESS_리듀서");
      return { ...state, category: action.category};
    }
    case ADD_CATEGORY_FAILURE: {
      console.log("add카테고리 FAILURE_리듀서");
      return { ...state, data: {}};
    }
    
    default:
      return state;
  }
};
export default addCategoryReducer;
