import { STATUS } from "components/utils/constants";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/Action";

const initialState = {
  nickName: "",
  isLogined: sessionStorage.getItem("token") ? true : "",
  token: sessionStorage.getItem("token"),
  message: "",
  status: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action?.type) {
    case LOGIN_REQUEST: {
      return { ...state };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        nickName: action.nickName,
        isLogined: action.isLogined,
        token: action.token,
        status: STATUS.success,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        status: STATUS.failure,
      };
    }
    case LOGOUT_REQUEST: {
      return { ...state, isLogined: false };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLogined: false,
        nickName: "",
        token: "",
        status: STATUS.success,
      };
    }
    case LOGOUT_FAILURE: {
      return {
        ...state,
        status: STATUS.failure,
      };
    }
    default:
      return state;
  }
};
export default loginReducer;
