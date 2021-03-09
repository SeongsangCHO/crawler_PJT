import {
  LINK_DATA_REQUEST,
  LINK_DATA_SUCCESS,
  LINK_DATA_FAILURE,
} from "../actions/registerAction";

const initialState = {
  data:'',
};

const linkDataApiCallReducer = (state = initialState, action) => {

  switch (action?.type) {
    case LINK_DATA_REQUEST: {
      console.log("링크API REQUEST_리듀서");
      return { ...state ,isCalled:true};
    }
    case LINK_DATA_SUCCESS: {
      console.log("링크API SUCCESS_리듀서");
      console.log(action.data);
      
      return { ...state,  data: {...action.data} ,isCalled:true};
    }
    case LINK_DATA_FAILURE: {
      console.log("링크API FAILURE_리듀서");
      return { ...state, error: action?.err ,isCalled:false};
    }
    default:
      return state;
  }
};

export default linkDataApiCallReducer;