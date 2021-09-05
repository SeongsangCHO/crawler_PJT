import { createStore, applyMiddleware, compose, combineReducers } from "redux";

// 여기서 부터 미들웨어/데브툴 관련 임포트
import { composeWithDevTools } from "redux-devtools-extension";
import signUpReducer from "./SignUp/reducer";
import registerReducer from "./Register/reducer";
// import loginReducer from "./Login/reducer";
import addCategoryReducer from "./AddCategory/reducer";
import linkDataApiCallReducer from "./LinkData/reducer";
import createSagaMiddleware from "redux-saga";
import currentCategoryReducer from "./CurrentCategory/reducer";
import addLinkReducer from "./AddLink/reducer";
import runCrawlerReducer from "./RunCrawler/reducer";
import reloadReducer from "./ReloadCrawl/reducer";
import loginReducer from "./Login/reducer";

import rootSaga from "./saga";
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware([]))
      : composeWithDevTools(applyMiddleware(...middlewares)); //middlewares배열을 여기다가 넣음.
  // 스토어 생성
  const store = createStore(
    combineReducers({
      signUpReducer,
      registerReducer,
      addCategoryReducer,
      linkDataApiCallReducer,
      currentCategoryReducer,
      addLinkReducer,
      runCrawlerReducer,
      reloadReducer,
      loginReducer,
    }),
    enhancer
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
