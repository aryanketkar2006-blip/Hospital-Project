import { useState, useCallback } from 'react';
import { STORAGE_KEY } from '../constants/strings.js';

/**
 * Custom hook for managing authentication state via localStorage.
 * Provides user data, login, logout, and authentication check utilities.
 * @returns {{ user: object|null, login: function, logout: function, isAuthenticated: boolean }}
 */
export default function useAuth() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  /**
   * Persists user data to localStorage and updates state.
   * @param {{ name: string, email: string, role: 'staff'|'patient' }} userData
   */
  const login = useCallback((userData) => {
    const record = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    setUser(record);
  }, []);

  /**
   * Removes user data from localStorage and clears state.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return {
    user,
    login,
    logout,
    isAuthenticated: user !== null,
  };
}
