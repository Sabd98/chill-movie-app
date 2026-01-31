import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('auth_user');
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
    return null;
  }
};

const initialState = {
  user: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth_user');
    },
    setUser: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        if (action.payload) {
             localStorage.setItem('auth_user', JSON.stringify(action.payload));
        } else {
             localStorage.removeItem('auth_user');
        }
    },
    updateUserSubscription: (state, action) => {
      if (state.user) {
        state.user.subscription = action.payload;
        localStorage.setItem('auth_user', JSON.stringify(state.user));
      }
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('auth_user', JSON.stringify(state.user));
      }
    }
  },
});

export const { logout, setUser, updateUserSubscription, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
