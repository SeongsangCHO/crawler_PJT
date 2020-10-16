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
} from "../actions/registerAction";

const initialState = {
  data: {
    user_nickname: "",
    user_password: "",
  },
  isDouble: false,
  isSigningUp: "init",
  isSignedUp: "init",
  isLogined: false,
  category:'',
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const registerReducer = (state = initialState, action) => {
  console.log("리듀서 호출");

  switch (action?.type) {
    case SIGN_UP_REQUEST: {
      console.log("REQUEST_리듀서");
      return { ...state, isSigningUp: true, isSignedUp: false };
    }
    case SIGN_UP_SUCCESS: {
      console.log("SUCCESS_리듀서");
      return {
        ...state,
        data: { ...action.data },
        isSigningUp: false,
        isSignedUp: true,
      };
    }
    case SIGN_UP_FAILURE: {
      console.log("FAILURE_리듀서");
      return { ...state, data: {} };
    }

    case NICK_DOUBLE_CHECK_REQUEST: {
      console.log("REQUEST_리듀서");
      return { ...state };
    }
    case NICK_DOUBLE_CHECK_SUCCESS: {
      console.log("SUCCESS_리듀서");
      return { ...state, data: { ...action.data }, isDouble: action.isDouble };
    }
    case NICK_DOUBLE_CHECK_FAILURE: {
      console.log("FAILURE_리듀서");
      return { ...state, data: {}, isDouble: action.isDouble };
    }

    case LOGIN_REQUEST: {
      console.log("로그인 REQUEST_리듀서");
      return { ...state };
    }
    case LOGIN_SUCCESS: {
      console.log("로그인 SUCCESS_리듀서");
      return { ...state, data: { ...action.data }, isLogined: action.isLogined };
    }
    case LOGIN_FAILURE: {
      console.log("로그인 FAILURE_리듀서");
      return { ...state, data: {}, isLogined: action.isLogined };
    }

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
export default registerReducer;
