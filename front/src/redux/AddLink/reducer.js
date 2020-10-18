
import {
  ADD_LINK_REQUEST,
  ADD_LINK_SUCCESS,
  ADD_LINK_FAILURE,
} from "../actions/registerAction";

const initialState = {
  data:{},
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const addCategoryReducer = (state = initialState, action) => {

  switch (action?.type) {
    case ADD_LINK_REQUEST: {
      console.log("add 링크 REQUEST_리듀서");
      return { ...state };
    }
    case ADD_LINK_SUCCESS: {
      console.log("add 링크 SUCCESS_리듀서");
      return { ...state, data: action.data};
    }
    case ADD_LINK_FAILURE: {
      console.log("add 링크 FAILURE_리듀서");
      return { ...state };
    }
    
    default:
      return state;
  }
};
export default addCategoryReducer;
