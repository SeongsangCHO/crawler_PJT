import {
	RELOAD_REQUEST,
	RELOAD_SUCCESS,
	RELOAD_FAILURE,
  } from "../actions/registerAction";
  
  const initialState = {
	  isReloaded: false,
	  linkTitle: '',
  };
  
  //상태가 변화할 때 수행되는 함수
  //Type에 따른 상태변화
  const reloadReducer = (state = initialState, action) => {
  
	switch (action?.type) {
	  case RELOAD_REQUEST: {
		return { ...state };
	  }
	  case RELOAD_SUCCESS: {
		return { ...state, isReloaded : action.isReloaded, linkTitle: action.linkTitle};
	  }
	  case RELOAD_FAILURE: {
		return { ...state, isReloaded: action.isReloade, linkTitle: '' };
	  }
	  default:
		return state;
	}
  };
  export default reloadReducer;
  