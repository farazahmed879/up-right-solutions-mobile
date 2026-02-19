import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { authService } from '../services/auth/authService';
import { storage } from '../utils/storage';
import { Config } from '../constants/config';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = await storage.get<User>(Config.USER_KEY);
        const token = await storage.get<string>(Config.TOKEN_KEY);

        if (storedUser && token) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    setUser({ username: response.username, role: response.role });
  };

  const register = async (name: string, email: string, password: string) => {
    await authService.register(name, email, password);
    // Usually registration also logs you in, or redirects to login
    // For this flow, let's assume we need to login separately
    // or the API returns a token.
    // If API returns token on register, we'd update user state here.
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
