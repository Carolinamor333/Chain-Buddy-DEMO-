import api from './api';
import { API_ENDPOINTS, CHAT_CONFIG } from '../config/constants';

export async function sendMessage(message, context = {}) {
  const response = await api.post(API_ENDPOINTS.CHAT, {
    message,
    context,
    config: CHAT_CONFIG
  });
  return response.data;
}

export async function analyzeInventory(inventoryData) {
  const response = await api.post(`${API_ENDPOINTS.CHAT}/analyze`, {
    data: inventoryData,
    config: CHAT_CONFIG
  });
  return response.data;
}