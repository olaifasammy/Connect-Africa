import React, { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken && savedToken.startsWith('mock-')) {
      localStorage.removeItem('token');
      return null;
    }
    return savedToken;
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const authToken = response.token || response.accessToken || response.data?.token || response.data?.accessToken;
      const userData = response.user || response.data?.user || { id: 'user-admin-001', email, roles: (email === 'olaifasammy@gmail.com' || email.includes('admin')) ? ['SUPER_ADMINISTRATOR', 'ADMIN'] : ['USER'] };
      
      localStorage.removeItem('loggedOut');
      if (authToken) {
        localStorage.setItem('token', authToken);
        setToken(authToken);
      }
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err: any) {
      throw new Error(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      await api.post('/auth/register', { email, password, firstName, lastName });
      await login(email, password);
    } catch (err: any) {
      throw new Error(err.message || 'Registration failed.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('loggedOut', 'true');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;
  const isAdmin = !!user?.roles?.some((r: string) => ['ADMIN', 'SUPER_ADMINISTRATOR'].includes(r));

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
