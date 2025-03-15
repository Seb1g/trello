import apiClient from '../api/createApi';

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const registerApi = (credentials: RegisterCredentials) => {
  return apiClient.post('/auth/registration', credentials);
};

export const loginApi = (credentials: LoginCredentials) => {
  return apiClient.post('/auth/login', credentials);
};

export const logoutApi = () => {
  return apiClient.post('/auth/logout');
}