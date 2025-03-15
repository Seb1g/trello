import axios from 'axios';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    const token: string | null = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use((config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`http://localhost:5000/auth/refresh`, {withCredentials: true})
        localStorage.setItem('token', response.data.accessToken);
        return apiClient.request(originalRequest)
      } catch (e: unknown) {
        console.log('Unauth', e)
      }
    }
    throw error;
  });

export default apiClient;