import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../actions/registerAction";

const initialState = {
  data: {
    user_nickname: "",
    user_password: "",
  },
  isDouble: false,
  isSigningUp: "init",
  isSignedUp: "init",
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const signUpReducer = (state = initialState, action) => {

  switch (action?.type) {
    case SIGN_UP_REQUEST: {
      return { ...state, isSigningUp: true, isSignedUp: false };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        data: { ...action.data },
        isSigningUp: false,
        isSignedUp: true,
      };
    }
    case SIGN_UP_FAILURE: {
      return { ...state, data: {} };
    }

    default:
      return state;
  }
};
export default signUpReducer;
