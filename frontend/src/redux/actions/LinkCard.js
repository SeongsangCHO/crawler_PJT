import { GET_CARDS_REQUEST, GET_PRODUCTS_LIST_REQUEST } from "./ActionType";

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
