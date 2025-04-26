import axios from 'axios';
import { format } from 'date-fns';

const API_BASE_URL = 'http://localhost:8000/api/tasks';

export const getTasks = async (date?: Date, status?: string) => {
  const params = new URLSearchParams();

  if (date) {
    params.append('created_at', format(date, 'yyyy-MM-dd'));
  }

  if (status && status !== 'all') {
    params.append('status', status);
  }

  const url = params.toString() ? `${API_BASE_URL}?${params}` : API_BASE_URL;

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (err: any) {
    console.error('getTasks error', err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Failed to fetch tasks');
  }
};

export const createTask = async (title: string, status: string = 'pending') => {
  try {
    const response = await axios.post(API_BASE_URL, { title, status });
    return response.data.data;
  } catch (err: any) {
    console.error('createTask error', err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Failed to create task');
  }
};

export const updateTask = async (id: number, title: string, status: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, { title, status });
    return response.data.data;
  } catch (err: any) {
    console.error('updateTask error', err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Failed to update task');
  }
};

export const updateTaskStatus = async (id: number, status: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}/status`, { status });
    return response.data.data;
  } catch (err: any) {
    console.error('updateTaskStatus error', err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Failed to update task status');
  }
};

export const deleteTask = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return true;
  } catch (err: any) {
    console.error('deleteTask error', err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'Failed to delete task');
  }
};

export default {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};