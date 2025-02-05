import apiClient from './createApi';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Функция для логина
export const loginApi = (credentials: LoginCredentials) => {
  return apiClient.post('/auth/login', credentials);
};

// Функция для регистрации
export const registerApi = (data: RegisterData) => {
  return apiClient.post('/auth/register', data);
};

// Функция для получения данных текущего пользователя
export const getMeApi = (token: string) => {
  return apiClient.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
};