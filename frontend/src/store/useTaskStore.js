
import { create } from "zustand";
import api from "../utils/apiIntercepter.js";
import { SERVER } from "../constants/constant.js";
import { toast } from "react-toastify";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  allTasks: [],
  loading: false,
  error: null,

  createTaskLoading: false,
  createTaskError: null,
  updateTaskLoading: false,
  updateTaskError: null,
  deleteTaskLoading: false,
  deleteTaskError: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setTasks: (tasks) => set({ tasks }),
  setAllTasks: (allTasks) => set({ allTasks }),

  fetchMyTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/task/my-tasks");
      set({ tasks: response.data.data.tasks, loading: false });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });
      throw error;
    }
  },

  createTask: async (title, description) => {
    set({ createTaskLoading: true, createTaskError: null });
    try {
      const response = await api.post("/task/create", {
        title,
        description,
      });
      const newTask = response.data.data.task;
      set((state) => ({ tasks: [newTask, ...state.tasks], createTaskLoading: false }));
      toast.success('Task created successfully!');
    } catch (error) {
      set({
        createTaskLoading: false,
        createTaskError: error.response?.data?.message || error.message,
      });
     toast.error(error.response?.data?.message || error.message);
    }
  },

  updateTask: async (taskId, title, description) => {
    set({ updateTaskLoading: true, updateTaskError: null });
    try {
      const response = await api.patch("/task/update", {
        taskId,
        title,
        description,
      });
      const updatedTask = response.data.data.task;
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        ),
        updateTaskLoading: false,
      }));
      toast.success('Task updated successfully!');
    } catch (error) {
      set({
        updateTaskLoading: false,
        updateTaskError: error.response?.data?.message || error.message,
      });
      toast.error(error.response?.data?.message || error.message);
    }
  },

  deleteTask: async (taskId) => {
    set({ deleteTaskLoading: true, deleteTaskError: null });
    try {
      const response = await api.delete("/task/delete", {
        data: { taskId },
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId),
        deleteTaskLoading: false,
        deleteTaskError: null,
      }));
      toast.success('Task deleted successfully!');
    } catch (error) {
      set({
        deleteTaskLoading: false,
        deleteTaskError: error.response?.data?.message || error.message,
      });
      toast.error(error.response?.data?.message || error.message);
    }
  },

  fetchAllTasksAdmin: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/task/all-tasks");
      set({ allTasks: response.data.data.tasks, loading: false });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || error.message,
      });
      throw error;
    }
  },

  deleteTaskAdmin: async (taskId) => {
    set({ deleteTaskLoading: true, deleteTaskError: null });
    try {
      const response = await api.delete("/task/admin-delete", {
        data: { taskId },
      });
      set((state) => ({
        allTasks: state.allTasks.filter((task) => task._id !== taskId),
        deleteTaskLoading: false,
        deleteTaskError: null,
      }));
      toast.success('Task deleted successfully!');
    } catch (error) {
      set({
        deleteTaskLoading: false,
        deleteTaskError: error.response?.data?.message || error.message,
      });
      toast.error(error.response?.data?.message || error.message);  
    }
  },

  clearTasks: () => set({ tasks: [], error: null }),
}));
