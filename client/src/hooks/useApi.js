import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const post = async (url, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(url, data);
      return response.data.data || response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const put = async (url, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(url, data);
      return response.data.data || response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const del = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(url);
      return response.data.data || response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { get, post, put, del, loading, error };
};

