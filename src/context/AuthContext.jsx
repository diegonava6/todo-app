import React, { createContext, useState, useCallback, useEffect } from 'react';
import { tokenManager } from '../utils/tokenManager.js';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from stored token
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = tokenManager.getToken();
        const userData = tokenManager.getUserData();

        if (token && userData) {
          setIsAuthenticated(true);
          setUser(userData);
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        setError('Failed to restore authentication');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback((token, userData) => {
    try {
      tokenManager.setToken(token);
      tokenManager.setUserData(userData);
      setIsAuthenticated(true);
      setUser(userData);
      setError(null);
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      setError('Failed to log in');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    try {
      tokenManager.clearAll();
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
      return true;
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Failed to log out');
      return false;
    }
  }, []);

  const updateUser = useCallback((userData) => {
    try {
      tokenManager.setUserData(userData);
      setUser(userData);
      setError(null);
      return true;
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update user data');
      return false;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 * @returns {object} Auth context value
 */
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
