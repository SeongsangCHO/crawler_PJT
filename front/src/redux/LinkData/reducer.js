import {
  LINK_DATA_REQUEST,
  LINK_DATA_SUCCESS,
  LINK_DATA_FAILURE,
  DELETE_CARD_REQUEST,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
} from "../actions/Action";

const initialState = {
  data: null,
  message: "",
  isCalled:false,
};

const linkDataApiCallReducer = (state = initialState, action) => {
  switch (action?.type) {
    case LINK_DATA_REQUEST: {
      console.log("링크API REQUEST_리듀서");
      return { ...state,isCalled:action.isCalled };
    }
    case LINK_DATA_SUCCESS: {
      console.log("링크API SUCCESS_리듀서");
      return {
        ...state,
        data: { ...action.data },
        isCalled: action.isCalled,
        message: "success",
      };
    }
    case LINK_DATA_FAILURE: {
      console.log("링크API FAILURE_리듀서");
      return {
        ...state,
        error: action?.err,
        isCalled: false,
        message: "failure",
      };
    }

    case DELETE_CARD_REQUEST: {
      return {...state};
    }
    case DELETE_CARD_SUCCESS: {
      
    }
    case DELETE_CARD_FAILURE: {
    }
    default:
      return state;
  }
};

export default linkDataApiCallReducer;
