import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {loginApi, logoutApi, registerApi} from "../../../shared/config/authApi.ts";
import {AuthResponse, IUser} from "../../../shared/api/createApi.ts";

export const login = createAsyncThunk(
  "auth/login",
  async ({email, password}: { email: string; password: string }, {rejectWithValue}) => {
    try {
      const response = await loginApi({email, password});
      localStorage.setItem("token", response.data.accessToken);
      return response.data;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data?.message);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async ({email, password}: { email: string; password: string }, {rejectWithValue}) => {
    try {
      const response = await registerApi({email, password});
      return response.data;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        return rejectWithValue(e.response?.data?.message);
      }
      return rejectWithValue("Unexpected error");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, {rejectWithValue}) => {
  try {
    await logoutApi();
    localStorage.removeItem("token");
    return {} as IUser;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data?.message);
    }
    return rejectWithValue("Unexpected error");
  }
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get<AuthResponse>(`http://localhost:5000/auth/refresh`, {withCredentials: true});
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      return rejectWithValue(e.response?.data?.message);
    }
    return rejectWithValue("Unexpected error");
  }
});