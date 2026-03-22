import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    data: [],
    error: null,
  },
  reducers: {
    // fetchUsersStart: (state) => ({ ...state, loading: true }),
    fetchUsersStart: () => {},
    fetchUserSuccess: (state, action) => ({ ...state, data: action?.payload }),
    fetchUserError: (state, action) => ({ ...state, error: action?.payload }),
  },
});

export const { fetchUsersStart, fetchUserSuccess, fetchUserError } =
  userSlice.actions;

export default userSlice.reducer;
