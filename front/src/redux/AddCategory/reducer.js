
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
      return { ...state };
    }
    case ADD_CATEGORY_SUCCESS: {
      return { ...state, category: action.category};
    }
    case ADD_CATEGORY_FAILURE: {
      return { ...state, data: {}};
    }
    
    default:
      return state;
  }
};
export default addCategoryReducer;
