import { STORAGE_KEYS } from '../config/constants.js';

/**
 * Token Manager - Handles secure token storage and retrieval
 */
export const tokenManager = {
  /**
   * Get the stored authentication token
   * @returns {string|null} The stored token or null if not found
   */
  getToken() {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Store authentication token
   * @param {string} token - The token to store
   */
  setToken(token) {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }
  },

  /**
   * Remove authentication token
   */
  clearToken() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Check if a token is stored
   * @returns {boolean} True if token exists
   */
  hasToken() {
    return !!this.getToken();
  },

  /**
   * Get user data from storage
   * @returns {object|null} The stored user data or null
   */
  getUserData() {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Store user data
   * @param {object} userData - The user data to store
   */
  setUserData(userData) {
    if (userData) {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    }
  },

  /**
   * Clear all auth-related data
   */
  clearAll() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },
};
