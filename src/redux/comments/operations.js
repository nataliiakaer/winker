import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const apiGetTaskComments = createAsyncThunk(
  "tasks/getTaskComments",
  async (id, thunkApi) => {
    try {
      const { data } = await instance.get(`/api/tasks/${id}/comments`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiAddTaskComment = createAsyncThunk(
  "tasks/addTaskComment",
  async ({ id, formData }, thunkApi) => {
    try {
      const { data } = await instance.post(
        `/api/tasks/${id}/comments`,
        formData
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiUpdateTaskComment = createAsyncThunk(
  "tasks/updateTaskComment",
  async ({ taskId, commentId, formData }, thunkApi) => {
    try {
      const { data } = await instance.put(
        `/api/tasks/${taskId}/comments/${commentId}`,
        formData
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteTaskComment = createAsyncThunk(
  "tasks/deleteTaskComment",
  async ({ taskId, commentId }, thunkApi) => {
    try {
      await instance.delete(`/api/tasks/${taskId}/comments/${commentId}`);
      return { id: commentId };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
