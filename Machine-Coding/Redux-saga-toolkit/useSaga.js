import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUsersStart,
  fetchUserError,
  fetchUserSuccess,
} from "./userSlice.js";

const fetchUserApi = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());

function* fetchUser() {
  try {
    const data = yield call(fetchUserApi);
    yield put(fetchUserSuccess(data));
  } catch (error) {
    yield put(fetchUserError(error.message));
  }
}

export function* watchUserSaga() {
  yield takeLatest(fetchUsersStart, fetchUser);
}
