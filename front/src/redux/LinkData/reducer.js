import {
  LINK_DATA_REQUEST,
  LINK_DATA_SUCCESS,
  LINK_DATA_FAILURE,
} from "../actions/Action";

const initialState = {
  data:'',
  message:'',
};

const linkDataApiCallReducer = (state = initialState, action) => {

  switch (action?.type) {
    case LINK_DATA_REQUEST: {
      console.log("링크API REQUEST_리듀서");
      return { ...state};
    }
    case LINK_DATA_SUCCESS: {
      console.log("링크API SUCCESS_리듀서");
      return { ...state,  data: {...action.data} ,isCalled:true,message:"success"};
    }
    case LINK_DATA_FAILURE: {
      console.log("링크API FAILURE_리듀서");
      return { ...state, error: action?.err ,isCalled:false,message:"failure"};
    }
    default:
      return state;
  }
};

export default linkDataApiCallReducer;