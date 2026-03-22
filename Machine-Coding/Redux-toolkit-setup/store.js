
// npm install @reduxjs/toolkit react-redux

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/Couter/CouterSlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
