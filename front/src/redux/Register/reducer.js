import {
  NICK_DOUBLE_CHECK_REQUEST,
  NICK_DOUBLE_CHECK_SUCCESS,
  NICK_DOUBLE_CHECK_FAILURE,
} from "../actions/Action";

const initialState = {
  isDouble: true,
  Loading: true,
  nickName: "",
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const registerReducer = (state = initialState, action) => {
  switch (action?.type) {
    case NICK_DOUBLE_CHECK_REQUEST: {
      return { ...state, isDouble: false, Loading: true };
    }
    case NICK_DOUBLE_CHECK_SUCCESS: {
      return {
        ...state,
        isDouble: false,
        Loading: false,
        nickName: action.nickName,
      };
    }
    case NICK_DOUBLE_CHECK_FAILURE: {
      return {
        ...state,
        isDouble: true,
        Loading: false,
        nickName: "",
      };
    }
    default:
      return state;
  }
};
export default registerReducer;
