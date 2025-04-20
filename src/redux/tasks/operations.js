import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const apiGetAllTasks = createAsyncThunk(
  "tasks/getAll",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("api/tasks/assigned-to-me");
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkApi) => {
    try {
      const { data } = await instance.delete(`api/tasks/${taskId}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
