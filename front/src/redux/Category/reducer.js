import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from "../actions/Action";

const initialState = {
  category: [],
  isAddCategory: false,
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const categoryReducer = (state = initialState, action) => {
  switch (action?.type) {
    case ADD_CATEGORY_REQUEST: {
      return { ...state, isAddCategory: action.isAddCategory };
    }
    case ADD_CATEGORY_SUCCESS: {
      console.log("actioncateog", action.category);

      return {
        ...state,
        category: [...state.category, action.category],
        isAddCategory: action.isAddCategory,
      };
    }
    case ADD_CATEGORY_FAILURE: {
      return { ...state, isAddCategory: false };
    }

    default:
      return state;
  }
};
export default categoryReducer;
