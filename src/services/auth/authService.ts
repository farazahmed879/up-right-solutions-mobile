import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import { storage } from '../../utils/storage';
import { Config } from '../../constants/config';

export interface AuthResponse {
  token: string;
  expiresIn: number;
  username: string;
  role: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        ENDPOINTS.AUTH.LOGIN,
        {
          username: email, // Assuming email is used as username based on user request
          password,
        },
      );

      const { token, expiresIn, username, role } = response.data;

      // Save to storage
      await storage.save(Config.TOKEN_KEY, token);
      await storage.save(Config.USER_KEY, { username, role });
      // Calculate expiry date if needed for proactive refresh

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      const response = await apiClient.post(ENDPOINTS.AUTH.REGISTER, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    await storage.remove(Config.TOKEN_KEY);
    await storage.remove(Config.REFRESH_TOKEN_KEY);
    await storage.remove(Config.USER_KEY);
  },

  getCurrentUser: async () => {
    return await storage.get<any>(Config.USER_KEY);
  },
};
