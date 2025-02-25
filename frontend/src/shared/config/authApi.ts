import apiClient from '../api/createApi';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface checkCredentials {
  email: string;
  token: string;
}

// Функция для логина
export const loginApi = (credentials: LoginCredentials) => {
  return apiClient.post('/auth/login', credentials);
};

// Функция для регистрации
export const registerApi = (data: RegisterData) => {
  return apiClient.post('/auth/register', data);
};

export const checkToken = (data: checkCredentials) => {
  return apiClient.post('/auth/checkToken', data);
}

// Функция для получения данных текущего пользователя
export const getMeApi = (token: string) => {
  return apiClient.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
};