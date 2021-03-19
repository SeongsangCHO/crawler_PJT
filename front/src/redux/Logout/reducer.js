

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../actions/Action";

const initialState = {
  message:'',
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const logOutReducer = (state = initialState, action) => {

  switch (action?.type) {
    case LOGOUT_REQUEST: {
      console.log("로그아웃 REQUEST_리듀서");
      console.log(state)
      return { ...state, message:action.message,};
    }
    case LOGOUT_SUCCESS: {
      console.log("로그아웃 SUCCESS_리듀서");
      return { ...state,message:"success"};
    }
    case LOGOUT_FAILURE: {
      console.log("로그아웃 FAILURE_리듀서");
      return { ...state,message: "failure" };
    }
    default:
      return state;
  }
};
export default logOutReducer;
