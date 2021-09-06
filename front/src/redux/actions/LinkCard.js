import {
  GET_CARDS_REQUEST,
  // GET_LINK_CARD_LIST_REQUEST,
  GET_PRODUCTS_LIST_REQUEST,
} from "./ActionType";

// export const requestGetLinkCardList = (id) => {
//   return {
//     type: GET_LINK_CARD_LIST_REQUEST,
//     id,
//   };
// };

export const requestGetProductsList = () => {
  return {
    type: GET_PRODUCTS_LIST_REQUEST,
  };
};
export const requestGetCards = () => {
  return {
    type: GET_CARDS_REQUEST,
  };
};

// export const requestAddCategory = () => {
//   return {
//     type: GET_LINK_CARD_LIST_SUCCESS,
//   };
// };
