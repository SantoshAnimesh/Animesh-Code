import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "../stores/userSlice.js";
import rootSaga from "./rootSaga.js";

const sagaMiddleWare = createSagaMiddleware();
const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ thunk: false }).concat(sagaMiddleWare),
});

sagaMiddleWare.run(rootSaga);

export default store;
