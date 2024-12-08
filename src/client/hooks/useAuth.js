import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import * as authService from '../services/authService';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, setAuthenticated, setLoading, setError } = useAuthStore();

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(credentials);
      setUser(data.user);
      setAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [navigate, setUser, setAuthenticated, setLoading, setError]);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setAuthenticated(false);
    navigate('/login');
  }, [navigate, setUser, setAuthenticated]);

  return {
    login,
    logout
  };
}