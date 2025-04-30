import { createSlice } from "@reduxjs/toolkit";
import { apiCurrentUser, apiGetUsers } from "./operations";

const initialState = {
  users: [],
  currentUser: [],
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
      })
      .addCase(apiCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
      })
      .addCase(apiCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
