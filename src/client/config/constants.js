export const AUTH_PROVIDERS = {
  GOOGLE: 'google',
  APPLE: 'apple',
  EMAIL: 'email'
};

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  INVENTORY: '/api/inventory',
  ORDERS: '/api/orders',
  CHAT: '/api/chat'
};

export const AUTH_CONFIG = {
  tokenKey: 'auth_token',
  tokenPrefix: 'Bearer'
};

export const CHAT_CONFIG = {
  maxTokens: 500,
  temperature: 0.7,
  model: 'gpt-4'
};