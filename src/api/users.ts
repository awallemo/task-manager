import axios from 'axios';
import { User } from '../types/task';

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

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get('/users');
  return data;
};