import axios from 'axios';
import { Task } from '../types/task';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get('/tasks');
  return data;
};

export const createTask = async (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt' | 'createdBy'>): Promise<Task> => {
  const { data } = await api.post('/tasks', task);
  return data;
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const { data } = await api.patch(`/tasks/${id}`, task);
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};