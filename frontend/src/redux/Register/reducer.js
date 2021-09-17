import {
  NICK_DOUBLE_CHECK_REQUEST,
  NICK_DOUBLE_CHECK_SUCCESS,
  NICK_DOUBLE_CHECK_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../actions/ActionType";
import { STATUS } from "components/utils/constants";

const initialState = {
  isDouble: true,
  Loading: true,
  nickName: "",
  status: "",
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
        status: STATUS.success,
      };
    }
    case NICK_DOUBLE_CHECK_FAILURE: {
      return {
        ...state,
        isDouble: true,
        Loading: false,
        nickName: "",
        status: STATUS.failure,
      };
    }
    case SIGN_UP_REQUEST: {
      return { ...state, isSigningUp: true, isSignedUp: false };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        status: STATUS.success,
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        status: STATUS.failure,
      };
    }
    default:
      return state;
  }
};
export default registerReducer;
