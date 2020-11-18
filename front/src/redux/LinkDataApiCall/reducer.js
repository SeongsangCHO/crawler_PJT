import {
  LINK_DATA_REQUEST,
  LINK_DATA_SUCCESS,
  LINK_DATA_FAILURE,
} from "../actions/registerAction";

const initialState = {
  data:'',
  isCalled: false,
};

const linkDataApiCallReducer = (state = initialState, action) => {

  switch (action?.type) {
    case LINK_DATA_REQUEST: {
      return { ...state ,isCalled:false};
    }
    case LINK_DATA_SUCCESS: {
      console.log(action.data);
      
      return { ...state,  data: {...action.data} ,isCalled:true};
    }
    case LINK_DATA_FAILURE: {
      return { ...state, error: action?.err ,isCalled:false};
    }
    default:
      return state;
  }
};

export default linkDataApiCallReducer;