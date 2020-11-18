
import {
  ADD_LINK_REQUEST,
  ADD_LINK_SUCCESS,
  ADD_LINK_FAILURE,
} from "../actions/registerAction";

const initialState = {
  data:{
    title : '',
    price : '',
    link :  '',
    info :  '',
    currentCategory: '',
  },
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const addLinkReducer = (state = initialState, action) => {

  switch (action?.type) {
    case ADD_LINK_REQUEST: {
      return { ...state };
    }
    case ADD_LINK_SUCCESS: {
      return { ...state, data: action.data};
    }
    case ADD_LINK_FAILURE: {
      return { ...state };
    }
    
    default:
      return state;
  }
};
export default addLinkReducer;
