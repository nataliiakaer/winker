import { createSlice } from "@reduxjs/toolkit";
import { apiGetUsers } from "./operations";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiGetUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(apiGetUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const usersReducer = usersSlice.reducer;
