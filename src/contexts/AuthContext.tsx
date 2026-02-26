import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { googleSheetsService } from '../services/googleSheetsService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credential: any) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('tsp_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        googleSheetsService.setAccessToken(parsedUser.accessToken);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('tsp_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (credential: any) => {
    try {
      // Decode JWT token to get user info
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const payload = JSON.parse(jsonPayload);

      const newUser: User = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        accessToken: credential,
      };

      setUser(newUser);
      localStorage.setItem('tsp_user', JSON.stringify(newUser));
      googleSheetsService.setAccessToken(credential);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tsp_user');
    googleSheetsService.setAccessToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
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
