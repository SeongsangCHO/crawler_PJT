

import {
  RUN_CRAWLER_REQUEST,
  RUN_CRAWLER_SUCCESS,
  RUN_CRAWLER_FAILURE,
} from "../actions/registerAction";

const initialState = {

  currentLinkTitle : '',
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const runCrawlerReducer = (state = initialState, action) => {

  switch (action?.type) {
    case RUN_CRAWLER_REQUEST: {
      console.log("크롤러 REQUEST_리듀서");
      return { ...state };
    }
    case RUN_CRAWLER_SUCCESS: {
      console.log("크롤러 SUCCESS_리듀서");
      return { ...state,  currentLinkTitle: action.currentLinkTitle };
    }
    case RUN_CRAWLER_FAILURE: {
      console.log("크롤러 FAILURE_리듀서");
      return { ...state};
    }
    default:
      return state;
  }
};
export default runCrawlerReducer;
