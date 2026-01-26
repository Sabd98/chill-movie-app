import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser } from '../api/auth';
import { subscribeToPlan, unsubscribeFromPlan } from '../api/subscription';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (username, password) => {
        set({ loading: true, error: null });
        try {
          const response = await loginUser({ username, password });
          const userData = response.data;
          // Ensure user has subscription field if not present
          if (!userData.subscription) {
            userData.subscription = { status: 'inactive' };
          }
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

      subscribe: async (planId) => {
        const { user } = get();
        if (!user) return { success: false, error: "User not logged in" };
        
        set({ loading: true, error: null });
        try {
          const response = await subscribeToPlan(user.username, planId);
          const subscriptionData = response.data;
          
          const updatedUser = { 
            ...user, 
            subscription: subscriptionData 
          };
          
          set({ user: updatedUser, loading: false });
          return { success: true };
        } catch (err) {
          set({ error: err.message, loading: false });
          return { success: false, error: err.message };
        }
      },

      unsubscribe: async () => {
        const { user } = get();
        if (!user) return { success: false, error: "User not logged in" };

        set({ loading: true, error: null });
        try {
          await unsubscribeFromPlan(user.username);
          
          const updatedUser = { 
            ...user, 
            subscription: { status: 'inactive' } 
          };
          
          set({ user: updatedUser, loading: false });
          return { success: true };
        } catch (err) {
          set({ error: err.message, loading: false });
          return { success: false, error: err.message };
        }
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
