import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const apiGetTasksAssignedToMe = createAsyncThunk(
  "tasks/getTasksAssignedToMe",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("api/tasks/assigned-to-me");
      console.log(data);
      return data; // те, що повертається з санки потрапляє в action.payload в статусі fullfilled
    } catch (error) {
      return thunkApi.rejectWithValue(error.message); // те, що повертається з санки потрапляє в action.payload в статусі rejected
    }
  }
);

export const apiGetMyTasks = createAsyncThunk(
  "tasks/getMyTasks",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("api/tasks/my-tasks");
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const apiGetAllTasks = createAsyncThunk(
//   "tasks/getAllTasks",
//   async (_, thunkApi) => {
//     try {
//       const [assignedResponse, myTasksResponse] = await Promise.all([
//         instance.get("api/tasks/assigned-to-me"),
//         instance.get("api/tasks/my-tasks"),
//       ]);
//       // Об'єднуємо всі завдання в один масив
//       const allTasks = [...assignedResponse.data, ...myTasksResponse.data];
//       // Унікалізуємо за id, щоб не було дублікатів в списку. В інакшому разі виникне помилка
//       const uniqueTasks = Array.from(
//         new Map(allTasks.map((task) => [task.id, task])).values()
//       );

//       return uniqueTasks;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

export const apiAddTask = createAsyncThunk(
  "tasks/getAddTask",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("api/tasks", formData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiGetTaskDetails = createAsyncThunk(
  "tasks/getTaskDetails",
  async (id, thunkApi) => {
    try {
      const { data } = await instance.get(`/api/tasks/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const apiDeleteTask = createAsyncThunk(
//   "tasks/deleteTask",
//   async (taskId, thunkApi) => {
//     try {
//       const { data } = await instance.delete(`api/tasks/${taskId}`);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
