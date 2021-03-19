import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  NICK_DOUBLE_CHECK_REQUEST,
  NICK_DOUBLE_CHECK_SUCCESS,
  NICK_DOUBLE_CHECK_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from "../actions/Action";

const initialState = {

};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const registerReducer = (state = initialState, action) => {


  switch (action?.type) {

    // case ADD_CATEGORY_REQUEST: {
    //   console.log("add카테고리 REQUEST_리듀서");
    //   return { ...state };
    // }
    // case ADD_CATEGORY_SUCCESS: {
    //   console.log("add카테고리 SUCCESS_리듀서");
    //   return { ...state, category: action.category};
    // }
    // case ADD_CATEGORY_FAILURE: {
    //   console.log("add카테고리 FAILURE_리듀서");
    //   return { ...state, data: {}};
    // }

    default:
      return state;
  }
};
export default registerReducer;
