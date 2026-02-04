import { API_CONFIG } from '../config/constants.js';
import { tokenManager } from '../utils/tokenManager.js';

/**
 * API Service - Handles all API requests with token-based authentication
 */
class APIService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.apiKey = API_CONFIG.API_KEY;
  }

  /**
   * Get authorization headers with token
   * @returns {object} Headers object with authorization
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add Claude API key if available
    if (this.apiKey) {
      headers['x-api-key'] = this.apiKey;
    }

    // Add stored auth token if available
    const token = tokenManager.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Make a GET request
   * @param {string} endpoint - The API endpoint
   * @param {object} options - Request options
   * @returns {Promise<any>} Response data
   */
  async get(endpoint, options = {}) {
    return this.request('GET', endpoint, null, options);
  }

  /**
   * Make a POST request
   * @param {string} endpoint - The API endpoint
   * @param {any} data - Request body data
   * @param {object} options - Request options
   * @returns {Promise<any>} Response data
   */
  async post(endpoint, data, options = {}) {
    return this.request('POST', endpoint, data, options);
  }

  /**
   * Make a PUT request
   * @param {string} endpoint - The API endpoint
   * @param {any} data - Request body data
   * @param {object} options - Request options
   * @returns {Promise<any>} Response data
   */
  async put(endpoint, data, options = {}) {
    return this.request('PUT', endpoint, data, options);
  }

  /**
   * Make a DELETE request
   * @param {string} endpoint - The API endpoint
   * @param {object} options - Request options
   * @returns {Promise<any>} Response data
   */
  async delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, null, options);
  }

  /**
   * Core request method
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {any} data - Request body
   * @param {object} options - Additional options
   * @returns {Promise<any>} Response data
   */
  async request(method, endpoint, data = null, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method,
      headers: this.getHeaders(),
      ...options,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);

      // Handle authentication errors
      if (response.status === 401) {
        tokenManager.clearToken();
        throw new Error('Authentication failed. Please log in again.');
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Request failed: ${method} ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Validate if API credentials are configured
   * @returns {boolean} True if credentials are available
   */
  isConfigured() {
    return !!this.apiKey;
  }
}

export const apiService = new APIService();
