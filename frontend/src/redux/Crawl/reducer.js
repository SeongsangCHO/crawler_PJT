import { STATUS } from "components/utils/constants";
import {
  RELOAD_REQUEST,
  RELOAD_SUCCESS,
  RELOAD_FAILURE,
  RUN_CRAWLER_REQUEST,
  RUN_CRAWLER_SUCCESS,
  RUN_CRAWLER_FAILURE,
  GET_CRAWL_DATA_LIST_FAILURE,
  GET_CRAWL_DATA_LIST_SUCCESS,
  GET_CRAWL_DATA_LIST_REQUEST,
} from "../actions/ActionType";

const initialState = {
  isReloaded: false,
  currentLinkTitle: "",
  status: "",
  crawlList: [],
};

const crawlReducer = (state = initialState, action) => {
  switch (action?.type) {
    case GET_CRAWL_DATA_LIST_REQUEST: {
      return {
        ...state,
        status: STATUS.request,
      };
    }
    case GET_CRAWL_DATA_LIST_SUCCESS: {
      return {
        ...state,
        crawlList: [...action.data],
        status: STATUS.success,
      };
    }
    case GET_CRAWL_DATA_LIST_FAILURE: {
      return {
        ...state,
        status: STATUS.failure,
      };
    }
    case RELOAD_REQUEST: {
      return {
        ...state,
        status: STATUS.request,
        isReloaded: false,
      };
    }
    case RELOAD_SUCCESS: {
      return {
        ...state,
        status: STATUS.success,
        isReloaded: action.isReloaded,
        linkTitle: action.linkTitle,
      };
    }
    case RUN_CRAWLER_REQUEST: {
      return {
        ...state,
        status: STATUS.request,
        currentLinkTitle: action.currentLinkTitle,
      };
    }
    case RUN_CRAWLER_SUCCESS: {
      return {
        ...state,
        status: STATUS.success,
      };
    }
    case RELOAD_FAILURE: {
      return {
        ...state,
        status: STATUS.failure,
      };
    }
    case RUN_CRAWLER_FAILURE: {
      return {
        ...state,
        status: STATUS.failure,
        isCrawled: false,
      };
    }
    default:
      return state;
  }
};
export default crawlReducer;
