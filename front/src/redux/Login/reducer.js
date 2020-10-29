

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/registerAction";

const initialState = {
  user_nickname: '',
  isSigningUp: '',
  isSignedUp: '',
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const loginReducer = (state = initialState, action) => {

  switch (action?.type) {
    case LOGIN_REQUEST: {
      console.log("로그인 REQUEST_리듀서");
      return { ...state };
    }
    case LOGIN_SUCCESS: {
      console.log("로그인 SUCCESS_리듀서");
      return { ...state,user_nickname: action.user_nickname,  isLogined: action.isLogined };
    }
    case LOGIN_FAILURE: {
      console.log("로그인 FAILURE_리듀서");
      return { ...state, isLogined: action.isLogined };
    }
    default:
      return state;
  }
};
export default loginReducer;
