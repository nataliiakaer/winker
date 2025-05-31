import { createSlice } from "@reduxjs/toolkit";
import {
  apiAddTask,
  apiGetAllTasks,
  // apiDeleteTask,
  apiGetMyTasks,
  apiGetTaskDetails,
  apiGetTasksAssignedToMe,
} from "./operations";

const INITIAL_STATE = {
  allTasks: [],
  myTasks: [],
  assignedTasks: [],
  modal: false,
  taskDetails: null,
  isLoading: false,
  error: null,
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

      .addCase(apiAddTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiAddTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const newTask = action.payload;
        state.allTasks.push(newTask);
        // Якщо я створив задачу — додаємо в мій список
        state.myTasks.push(newTask);
        // Якщо задача призначена мені — додаємо і туди
        if (newTask.assignee === state.users.currentUser) {
          state.assignedTasks.push(newTask);
        }
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
export const tasksListsReducer = tasksSlice.reducer;
