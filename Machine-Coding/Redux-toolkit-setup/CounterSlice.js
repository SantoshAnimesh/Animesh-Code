import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counterVal: 0,
  loading: false,
};

const couterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter: (state, action) => {
      return {
        ...state,
        counterVal: state?.counterVal + action.payload,
      };
    },
    decrementCounter: (state, action) => ({
      ...state,
      counterVal: state?.counterVal - action.payload,
    }),
    updateCouterVal: (state, action) => ({
      ...state,
      counterVal: action.payload,
    }),
  },
});

export const { incrementCounter, decrementCounter, updateCouterVal } =
  couterSlice.actions;

export default couterSlice.reducer;
