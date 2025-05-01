import { createSlice } from "@reduxjs/toolkit";
import {
  apiAddTask,
  // apiDeleteTask,
  apiGetAllTasks,
  apiGetMyTasks,
  apiGetTasksAssignedToMe,
} from "./operations";

const INITIAL_STATE = {
  allTasks: [],
  myTasks: [],
  assignedTasks: [],
  isLoading: false,
  error: null,
  modal: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: INITIAL_STATE,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiGetTasksAssignedToMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetTasksAssignedToMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assignedTasks = action.payload;
      })
      .addCase(apiGetTasksAssignedToMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiGetMyTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetMyTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myTasks = action.payload;
      })
      .addCase(apiGetMyTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiGetAllTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allTasks = action.payload;
      })
      .addCase(apiGetAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

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
      });

    // .addCase(apiDeleteTask.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(apiDeleteTask.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.allTasks = state.allTasks.filter(
    //     (task) => task.id !== action.payload.id
    //   );
    //   state.myTasks = state.myTasks.filter(
    //     (task) => task.id !== action.payload.id
    //   );
    //   state.assignedTasks = state.assignedTasks.filter(
    //     (task) => task.id !== action.payload.id
    //   );
    // })
    // .addCase(apiDeleteTask.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { setModal } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
