// src/lib/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://gasify-yaxj.onrender.com/api',
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
