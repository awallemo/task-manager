import axios from 'axios';
import { User } from '../types/task';

const api = axios.create({
  baseURL: '/api',
});

interface AuthResponse {
  user: User;
  token: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post('/auth/register', { name, email, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  
  const { data } = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};