import { STATUS } from "components/utils/constants";
import {
  DELETE_CARD_REQUEST,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  GET_PRODUCTS_LIST_REQUEST,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCTS_LIST_FAILURE,
  GET_CARDS_FAILURE,
  GET_CARDS_SUCCESS,
  GET_CARDS_REQUEST,
  SET_FILTERED_CARDS,
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  SET_SELECTED_CARD_ID,
} from "../actions/ActionType";

const initialState = {
  products: [],
  status: "",
  cards: [],
  selectedCardData: {
    id: -1,
    title: "",
    price: -1,
  },
  filteredCards: [],
};

const linkDataApiCallReducer = (state = initialState, action) => {
  switch (action?.type) {
    case SET_SELECTED_CARD_ID: {
      return {
        ...state,
        selectedCardData: {
          id: action.id,
          title: action.title,
          price: action.price,
        },
      };
    }
    case SET_FILTERED_CARDS: {
      return {
        ...state,
        filteredCards: state.cards.filter((card) =>
          action.id === -1 ? card : action.id === card.categoryId
        ),
      };
    }
    case GET_CARDS_REQUEST: {
      return {
        ...state,
        status: STATUS.request,
      };
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

    case ADD_CARD_REQUEST: {
      return { ...state, status: STATUS.request };
    }
    case ADD_CARD_SUCCESS: {
      return {
        ...state,
        cards: [...state.cards, action.data],
        filteredCards: [...state.filteredCards, action.data],
        status: STATUS.success,
      };
    }
    case ADD_CARD_FAILURE: {
      return { ...state, status: STATUS.failure };
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
      break;
    }
    default:
      return state;
  }
};

export default linkDataApiCallReducer;
