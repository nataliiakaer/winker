import { createSlice } from "@reduxjs/toolkit";
import { apiAddTask, apiGetTaskDetails } from "./operations.js";

const INITIAL_STATE = {
  modal: false,
  taskDetails: null,
  isLoading: false,
  error: null,
};

const taskDetailsSlice = createSlice({
  name: "taskDetails",
  initialState: INITIAL_STATE,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(apiAddTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiAddTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myTasks.push(action.payload);
        state.modal = false;
      })
      .addCase(apiAddTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiGetTaskDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetTaskDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskDetails = action.payload;
      })
      .addCase(apiGetTaskDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setModal } = taskDetailsSlice.actions;
export const taskDetailsReducer = taskDetailsSlice.reducer;
