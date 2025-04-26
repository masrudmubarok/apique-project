import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/tasks';

export const getTasks = async () => {

  try {
    const response = await axios.get(API_BASE_URL);
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
  deleteTask,
};