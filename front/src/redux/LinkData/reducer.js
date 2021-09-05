import {
  LINK_DATA_REQUEST,
  LINK_DATA_SUCCESS,
  LINK_DATA_FAILURE,
  DELETE_CARD_REQUEST,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
} from "../actions/ActionType";

const initialState = {
  data: null,
  message: "",
  isCalled:false,
  isDeleted:false,
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
      return {...state, isDeleted:false, currentCategory:action.currentCategory};
    }
    case DELETE_CARD_SUCCESS: {
      
      const currentCategory = state.currentCategory
      let result = state.data.category.map((category) =>{
        if(Object.keys(category)[0] === currentCategory){
          return {[currentCategory]: category[currentCategory].filter((item) => item.id !== action.deletedId)}
        }
        return category;
      })
      return {...state, data:{category:result}, isDeleted:true}
    }
    case DELETE_CARD_FAILURE: {
    }
    default:
      return state;
  }
};

export default linkDataApiCallReducer;
