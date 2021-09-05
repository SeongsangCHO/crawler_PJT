import { GET_LINK_CARD_LIST_REQUEST } from "./ActionType";

export const requestGetLinkCardList = (id) => {
  return {
    type: GET_LINK_CARD_LIST_REQUEST,
    id: id,
  };
};

// export const requestAddCategory = () => {
//   return {
//     type: GET_LINK_CARD_LIST_SUCCESS,
//   };
// };
