import {
  loginApi,
  registerApi,
  LoginCredentials,
  RegisterData,
  checkToken,
  checkCredentials
} from '../../../shared/config/authApi';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {User} from './authSlice';

// Функция для обработки ошибок, получаемых от axios
const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Ошибка запроса';
  }
  return 'Неизвестная ошибка';
};

// Thunk для логина
export const login = createAsyncThunk<
  { user: User; token: string; isLoggedIn: boolean },
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, {rejectWithValue}) => {
  try {
    const response = await loginApi(credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

// Thunk для проверки токена
export const check = createAsyncThunk<
  { user: User, isLoggedIn: boolean },
  checkCredentials,
  { rejectValue: string }
>('auth/checkToken', async (checkCredentials, {rejectWithValue}) => {
  try {
    const response = await checkToken(checkCredentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

// Thunk для регистрации
export const register = createAsyncThunk<
  { user: User; token: string; isLoggedIn: boolean; },
  RegisterData,
  { rejectValue: string }
>('auth/register', async (data, {rejectWithValue}) => {
  try {
    const response = await registerApi(data);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});