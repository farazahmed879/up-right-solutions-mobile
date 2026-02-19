import axios from 'axios';
import { Config } from '../../constants/config';
import { storage } from '../../utils/storage';
import { ENDPOINTS } from './endpoints';

const apiClient = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  async config => {
    const token = await storage.get<string>(Config.TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor for token refresh
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await storage.get<string>(
          Config.REFRESH_TOKEN_KEY,
        );

        // Call refresh endpoint
        const response = await axios.post(
          `${Config.API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`,
          {
            refreshToken,
          },
        );

        const { token, expiresIn } = response.data;

        await storage.save(Config.TOKEN_KEY, token);
        // Note: Update expiry if needed

        processQueue(null, token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Logout or handle session death
        await storage.remove(Config.TOKEN_KEY);
        await storage.remove(Config.REFRESH_TOKEN_KEY);
        await storage.remove(Config.USER_KEY);
        // You might want to trigger a logout event here
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
