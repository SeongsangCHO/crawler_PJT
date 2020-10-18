import { createStore, applyMiddleware, compose, combineReducers } from "redux";

// 여기서 부터 미들웨어/데브툴 관련 임포트
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import registerReducer from "./reducers/registerReducer";
import signUpReducer from "./SignUp/reducer";
import doubleCheckReducer from "./DoubleCheck/reducer";
import loginReducer from "./Login/reducer";
import addCategoryReducer from "./AddCategory/reducer";
import linkDataApiCallReducer from './LinkDataApiCall/reducer';
import createSagaMiddleware from "redux-saga";
import currentCategoryReducer from './CurrentCategory/reducer';


import rootSaga from "./saga";
const initialState = {
  data: {},
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
      signUpReducer,
      doubleCheckReducer,
      loginReducer,
      addCategoryReducer,
      linkDataApiCallReducer,
      currentCategoryReducer,
    }),
    initialState,
    enhancer
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
