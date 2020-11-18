

import {
  RUN_CRAWLER_REQUEST,
  RUN_CRAWLER_SUCCESS,
  RUN_CRAWLER_FAILURE,
} from "../actions/registerAction";

const initialState = {

  currentLinkTitle : '',
  isCrawled:false,
};

//상태가 변화할 때 수행되는 함수
//Type에 따른 상태변화
const runCrawlerReducer = (state = initialState, action) => {

  switch (action?.type) {
    case RUN_CRAWLER_REQUEST: {
      return { ...state ,isCrawled:false};
    }
    case RUN_CRAWLER_SUCCESS: {
      return { ...state,  currentLinkTitle: action.currentLinkTitle,isCrawled:true };
    }
    case RUN_CRAWLER_FAILURE: {
      return { ...state};
    }
    default:
      return state;
  }
};
export default runCrawlerReducer;
