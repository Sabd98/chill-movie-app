import { useState } from "react";
import { loginUser, registerUser } from "../api/auth";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") !== null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser({ username, password });
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      const message = err.message || "Terjadi kesalahan saat login";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser({ username, password });
      return { success: true };
    } catch (err) {
      const message = err.message || "Terjadi kesalahan saat mendaftar";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const updateUserState = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const clearError = () => setError(null);

  return { 
    user, 
    isAuthenticated, 
    login, 
    register, 
    logout, 
    loading, 
    error, 
    clearError,
    updateUserState 
  };
};
