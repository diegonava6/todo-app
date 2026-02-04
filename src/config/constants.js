// API Configuration Constants
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_CLAUDE_API_BASE_URL || 'https://api.anthropic.com',
  API_KEY: import.meta.env.VITE_CLAUDE_API_KEY,
  ENVIRONMENT: import.meta.env.VITE_APP_ENV || 'development',
};

// Token storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
};

// API endpoints
export const API_ENDPOINTS = {
  TODOS: '/todos',
  AUTH: '/auth',
};
