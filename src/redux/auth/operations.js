import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://winker.com.ua/",
});
// Вище - це аналог до: axios.defaults.baseURL = "https://winker.com.ua/";

const setAuthHeaders = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const apiLogin = createAsyncThunk(
  "auth/login",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("api/login_check", formData);
      setAuthHeaders(data.token);
      console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Щось пішло не так"
      );
    }
  }
);

// після перезавантаження сторінки, не відбудеться розлогінення. Санка диспатчится під час ініціалізації додатку
export const apiRefreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setAuthHeaders(token);
      const { data } = await instance.get("api/mercure-token");
      return data; 
    } catch (error) {
      return thunkApi.rejectWithValue(error.massage);
    }
  },
  // Якщо токену в стейті немає, потрібна умова:
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (token) return true;
      return false;
    },
  }
);

// export const apiLogout = createAsyncThunk(
//   "auth/logout"
//   // async (_, thunkApi) => {
//   //   try {
//   //     await instance.post("api/logout");
//   //     setAuthHeaders("");
//   //     return;
//   //   } catch (error) {
//   //     return thunkApi.rejectWithValue(error.message);
//   //   }
//   // }
// );
