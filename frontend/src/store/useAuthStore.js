import { create } from "zustand";
import api from "../utils/apiIntercepter.js";
import { SERVER } from "../constants/constant.js";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  loading: false,

  signupLoading: false,
  loginLoading: false,
  
  error: null,
  backendUrl: SERVER,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setUser: (user) => set({ authUser: user}),

  signup: async (name, email, password, setError) => {
    set({ signupLoading: true, error: null });
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ signupLoading: false });
      toast.success(response.data.message || 'Signup successful! Please login.');
    } catch (error) {
      set({
        signupLoading: false,
        error: error.response?.data?.message || error.message,
      });
      setError(error.response?.data?.message || error.message);
    }
  },

  login: async (email, password, setError) => {
    set({ loginLoading: true, error: null });
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      await get().fetchProfile();
      set({ loginLoading: false });
      toast.success(response.data.message || 'Login successful!');
    } catch (error) {
        let errorMessage = error.response?.data?.message || error.message;
      set({
        loginLoading: false,
        error: errorMessage,
      });
      setError(errorMessage);
    }
  },

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/auth/me");
      set({ authUser: response.data.data.user, loading: false });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        authUser: null,
        error: error.response?.data?.message || error.message,
      });
    //   throw error;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/auth/logout");
      set({ authUser: null, loading: false });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });
      throw error;
    }
  },

  fetchAdminCheck: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/auth/admin");
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });
      throw error;
    }
  },
}));
