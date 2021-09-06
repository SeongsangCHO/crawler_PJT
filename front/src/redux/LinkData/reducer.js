import { STATUS } from "components/utils/constants";
import {
  DELETE_CARD_REQUEST,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  GET_LINK_CARD_LIST_REQUEST,
  GET_LINK_CARD_LIST_SUCCESS,
  GET_LINK_CARD_LIST_FAILURE,
  GET_PRODUCTS_LIST_REQUEST,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCTS_LIST_FAILURE,
  GET_CARDS_FAILURE,
  GET_CARDS_SUCCESS,
  GET_CARDS_REQUEST,
  SET_FILTERED_CARDS,
} from "../actions/ActionType";

const initialState = {
  products: [],
  status: "",
  cards: [],
  selectedCategory: 0,
  filteredCards: [],
};

const linkDataApiCallReducer = (state = initialState, action) => {
  switch (action?.type) {
    case SET_FILTERED_CARDS: {
      return { ...state, filteredCards: [...state.cards] };
    }
    case GET_CARDS_REQUEST: {
      return { ...state, status: STATUS.request };
    }
    case GET_CARDS_SUCCESS: {
      return {
        ...state,
        status: STATUS.success,
        cards: [...action.cards],
        filteredCards: [...action.cards],
      };
    }
    case GET_CARDS_FAILURE: {
      return { ...state, status: STATUS.failure };
    }
    case GET_PRODUCTS_LIST_REQUEST: {
      return {
        ...state,
        status: STATUS.request,
      };
    }
    case GET_PRODUCTS_LIST_SUCCESS: {
      return {
        ...state,
        products: [...action.products],
        status: STATUS.success,
      };
    }
    case GET_PRODUCTS_LIST_FAILURE: {
      return { ...state, status: STATUS.failure };
    }
    case GET_LINK_CARD_LIST_REQUEST: {
      return { ...state, status: STATUS.request };
    }
    case GET_LINK_CARD_LIST_SUCCESS: {
      return {
        ...state,
        cardList: action.data,
        filteredCards: state.cards.filter((card) => card.id === 249),
        status: STATUS.success,
      };
    }
    case GET_LINK_CARD_LIST_FAILURE: {
      return {
        ...state,
        status: STATUS.failure,
      };
    }

    case DELETE_CARD_REQUEST: {
      return {
        ...state,
        isDeleted: false,
        currentCategory: action.currentCategory,
      };
    }
    case DELETE_CARD_SUCCESS: {
      const currentCategory = state.currentCategory;
      let result = state.data.category.map((category) => {
        if (Object.keys(category)[0] === currentCategory) {
          return {
            [currentCategory]: category[currentCategory].filter(
              (item) => item.id !== action.deletedId
            ),
          };
        }
        return category;
      });
      return { ...state, data: { category: result }, isDeleted: true };
    }
    case DELETE_CARD_FAILURE: {
    }
    default:
      return state;
  }
};

export default linkDataApiCallReducer;
