import { all } from "redux-saga/effects";
import { watchUserSaga } from "../stores/saga.js";

export default function* rootSaga() {
  yield all([watchUserSaga()]);
}
