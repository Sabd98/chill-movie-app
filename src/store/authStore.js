import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser } from '../api/auth';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          const response = await loginUser({ username, password });
          const userData = response.data;
          set({ user: userData, isAuthenticated: true, loading: false });
          return { success: true };
        } catch (err) {
          const message = err.message || "Login gagal";
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      register: async (username, password) => {
        set({ loading: true, error: null });
        try {
          await registerUser({ username, password });
          set({ loading: false });
          return { success: true };
        } catch (err) {
          const message = err.message || "Registrasi gagal";
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      updateUserState: (updatedUser) => {
        set({ user: updatedUser });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;
