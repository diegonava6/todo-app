import { apiService } from './api.js';
import { API_ENDPOINTS } from '../config/constants.js';

/**
 * Todo Service - Handles todo-specific API operations
 */
export const todoService = {
  /**
   * Fetch all todos
   * @returns {Promise<Array>} Array of todos
   */
  async getTodos() {
    try {
      const response = await apiService.get(API_ENDPOINTS.TODOS);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      throw error;
    }
  },

  /**
   * Create a new todo
   * @param {object} todoData - Todo data to create
   * @returns {Promise<object>} Created todo
   */
  async createTodo(todoData) {
    try {
      const response = await apiService.post(API_ENDPOINTS.TODOS, todoData);
      return response.data;
    } catch (error) {
      console.error('Failed to create todo:', error);
      throw error;
    }
  },

  /**
   * Update an existing todo
   * @param {string|number} todoId - The todo ID
   * @param {object} updates - Updates to apply
   * @returns {Promise<object>} Updated todo
   */
  async updateTodo(todoId, updates) {
    try {
      const response = await apiService.put(`${API_ENDPOINTS.TODOS}/${todoId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Failed to update todo:', error);
      throw error;
    }
  },

  /**
   * Delete a todo
   * @param {string|number} todoId - The todo ID
   * @returns {Promise<void>}
   */
  async deleteTodo(todoId) {
    try {
      await apiService.delete(`${API_ENDPOINTS.TODOS}/${todoId}`);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      throw error;
    }
  },

  /**
   * Batch create todos
   * @param {Array} todosData - Array of todo data
   * @returns {Promise<Array>} Array of created todos
   */
  async createTodos(todosData) {
    try {
      const response = await apiService.post(`${API_ENDPOINTS.TODOS}/batch`, {
        todos: todosData,
      });
      return response.data || [];
    } catch (error) {
      console.error('Failed to create todos:', error);
      throw error;
    }
  },
};
