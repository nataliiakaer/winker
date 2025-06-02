import { createSlice } from "@reduxjs/toolkit";
import {
  apiAddTaskComment,
  apiDeleteTaskComment,
  apiGetTaskComments,
  apiUpdateTaskComment,
} from "./operations.js";

const INITIAL_STATE = {
  comments: [],
  isLoading: false,
  error: null,
  success: null,
};

const taskComments = createSlice({
  name: "taskComments",
  initialState: INITIAL_STATE,

  extraReducers: (builder) => {
    builder
      .addCase(apiGetTaskComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetTaskComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(apiGetTaskComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiAddTaskComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiAddTaskComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.success = "Коментар додано!";
      })
      .addCase(apiAddTaskComment.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(apiUpdateTaskComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiUpdateTaskComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
        state.success = "Коментар оновлено!";
      })
      .addCase(apiUpdateTaskComment.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(apiDeleteTaskComment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiDeleteTaskComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload.id
        );
      })
      .addCase(apiDeleteTaskComment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const taskCommentsReducer = taskComments.reducer;
