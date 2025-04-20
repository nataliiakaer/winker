import { createSlice } from "@reduxjs/toolkit";
import { apiDeleteTask, apiGetAllTasks } from "./operations";

const INITIAL_STATE = {
  tasks: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiGetAllTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(apiGetAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiDeleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiDeleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(apiDeleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
