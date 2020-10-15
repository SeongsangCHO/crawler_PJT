import {SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE, NICK_DOUBLE_CHECK_REQUEST, NICK_DOUBLE_CHECK_SUCCESS, NICK_DOUBLE_CHECK_FAILURE} from '../actions/registerAction';

const initialState = {
  data: {
    user_nickname: "",
    user_password: "",
  },
  isDouble: false,
  isSigningUp: 'init',
  isSignedUp: 'init',
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const registerReducer = (state = initialState, action) => {
  console.log("리듀서 호출");

  switch (action?.type) {
    case SIGN_UP_REQUEST: {
      console.log("REQUEST_리듀서");
      return { ...state, isSigningUp : true, isSignedUp:false, };
    }
    case SIGN_UP_SUCCESS:{
      console.log("SUCCESS_리듀서");
      return { ...state, data: { ...action.data },isSigningUp : false, isSignedUp:true, };
    }
    case SIGN_UP_FAILURE:{
      console.log("FAILURE_리듀서");
      return { ...state, data: {} };
    }
    case NICK_DOUBLE_CHECK_REQUEST: {
      console.log("REQUEST_리듀서");
      return { ...state};
    }
    case NICK_DOUBLE_CHECK_SUCCESS:{
      console.log("SUCCESS_리듀서");
      return { ...state, data: { ...action.data },isDouble:action.isDouble};
    }
    case NICK_DOUBLE_CHECK_FAILURE:{
      console.log("FAILURE_리듀서");
      return { ...state, data: {}, isDouble:action.isDouble};
    }
    default:
      return state;
  }
};
export default registerReducer;
