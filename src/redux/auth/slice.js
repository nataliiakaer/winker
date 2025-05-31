// Редюсер (reducer) - це функція, яка приймає поточний стан та екшен як аргументи і повертає новий стан.
// - Кожен раз коли в додатку відправляється екшен, викликається редюсер щоб його обробити.
// - Редюсер визначає, як змінюється стан програми у відповідь на надіслані екшени.
// - Екшени описують тільки те, що сталося, а не як змінюється стан програми.

import { createSlice } from "@reduxjs/toolkit";
import { apiLogin, apiRefreshUser, logout } from "./operations";

const INITIAL_STATE = {
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

// глобальна дія logout

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(apiLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(apiRefreshUser.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(apiRefreshUser.fulfilled, (state) => {
        state.isLoggedIn = true;
        // state.user = action.payload;
        state.isRefreshing = false;
      })
      .addCase(apiRefreshUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      })
      .addCase(logout, () => INITIAL_STATE); // важливо!

    // .addCase(apiLogout.pending, (state) => {
    //   state.error = null;
    // })
    // .addCase(apiLogout.fulfilled, () => {
    //   return INITIAL_STATE;
    // })
    // .addCase(apiLogout.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
  },
});

export const authReducer = authSlice.reducer;
