import {
  NICK_DOUBLE_CHECK_REQUEST,
  NICK_DOUBLE_CHECK_SUCCESS,
  NICK_DOUBLE_CHECK_FAILURE,
} from "../actions/registerAction";

const initialState = {
  data: {
    user_nickname: "",
  },
  isDouble: false,
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const doubleCheckReducer = (state = initialState, action) => {

  switch (action?.type) {
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
    default:
      return state;
  }
};
export default doubleCheckReducer;
