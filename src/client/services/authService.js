import api from './api';
import { API_ENDPOINTS, AUTH_CONFIG } from '../config/constants';

export async function login(credentials) {
  const response = await api.post(`${API_ENDPOINTS.AUTH}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem(AUTH_CONFIG.tokenKey, response.data.token);
  }
  return response.data;
}

export async function register(userData) {
  const response = await api.post(`${API_ENDPOINTS.AUTH}/register`, userData);
  return response.data;
}

export async function logout() {
  localStorage.removeItem(AUTH_CONFIG.tokenKey);
}

export async function getProfile() {
  const response = await api.get(`${API_ENDPOINTS.USERS}/profile`);
  return response.data;
}