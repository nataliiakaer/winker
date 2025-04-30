import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const apiGetUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("/api/users");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("/api/users/user-info");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);