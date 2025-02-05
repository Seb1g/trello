import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // базовый URL API
});

// Интерсептор запроса — гарантируем, что headers определены и устанавливаем Content-Type
apiClient.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерсептор ответа — можно добавить обработку ошибок, логирование и т.д.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Здесь можно перехватывать ошибки и, например, логировать их
    return Promise.reject(error);
  }
);

export default apiClient;