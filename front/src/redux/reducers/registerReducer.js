import {SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE} from '../actions/registerAction';

const initialState = {
  data: {
    user_nickname: "",
    user_password: "",
  },
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const registerReducer = (state = initialState, action) => {
  console.log("리듀서 호출");
  console.log(state);

  switch (action?.type) {
    case SIGN_UP_REQUEST: {
      console.log("REQUEST_리듀서");
      return { ...state };
    }
    case SIGN_UP_SUCCESS:{
      console.log("SUCCESS_리듀서");
      console.log(action.data);
      return { ...state, data: { ...action.data } };
    }
    case SIGN_UP_FAILURE:{
      console.log("FAILURE_리듀서");
      return { ...state, payload: {} };
    }
    default:
      return state;
  }
};
export default registerReducer;
