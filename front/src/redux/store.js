import { createStore, applyMiddleware, compose, combineReducers } from "redux";

// 여기서 부터 미들웨어/데브툴 관련 임포트
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import registerReducer from "./reducers/registerReducer";
import createLogger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
const initialState = {
  data:{}
};
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [logger, sagaMiddleware]; //thunk (비동기작업을 돕는 라이브러리)를 넣음
  //배포용과 개발용의 미들웨어 차이를 두기 위함
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware([]))
      : composeWithDevTools(applyMiddleware(...middlewares)); //middlewares배열을 여기다가 넣음.
  // 스토어 생성
  const store = createStore(
    combineReducers({
      registerReducer,
  }),
    initialState,
    enhancer
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
