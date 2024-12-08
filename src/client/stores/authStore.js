import { create } from 'zustand';

export const useAuth = create((set) => ({
  isAuthenticated: true, // Always authenticated for demo
  user: {
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@example.com',
    role: 'ADMIN'
  },
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false })
}));