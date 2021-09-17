import { ADD_CATEGORY_REQUEST, GET_CATEGORY_REQUEST } from "./ActionType";

export const requestGetCategoires = (id) => {
  return {
    type: GET_CATEGORY_REQUEST,
    id: id,
  };
};

export const requestAddCategory = () => {
  return {
    type: ADD_CATEGORY_REQUEST,
  };
};
