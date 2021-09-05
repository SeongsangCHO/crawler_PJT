import {
  NICK_DOUBLE_CHECK_REQUEST,
  NICK_DOUBLE_CHECK_SUCCESS,
  NICK_DOUBLE_CHECK_FAILURE,
} from "../actions/Action";

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
      return { ...state };
    }
    case NICK_DOUBLE_CHECK_SUCCESS: {
      return { ...state, data: { ...action.data }, isDouble: action.isDouble };
    }
    case NICK_DOUBLE_CHECK_FAILURE: {
      return { ...state, data: {}, isDouble: action.isDouble };
    }
    default:
      return state;
  }
};
export default doubleCheckReducer;
