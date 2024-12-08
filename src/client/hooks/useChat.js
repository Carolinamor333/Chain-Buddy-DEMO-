import { useState, useCallback } from 'react';
import * as chatService from '../services/chatService';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (content) => {
    setLoading(true);
    setError(null);
    try {
      const userMessage = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);

      const response = await chatService.sendMessage(content, {
        history: messages
      });

      const assistantMessage = { role: 'assistant', content: response.message };
      setMessages(prev => [...prev, assistantMessage]);
      return response;
    } catch (error) {
      setError(error.message);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearChat
  };
}