import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPosts = async (search = '', category = '') => {
  const params = {};
  if (search) params.search = search;
  if (category) params.category = category;

  const response = await api.get('/posts', { params });
  return response.data.data || response.data;
};

export const getPost = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data.data || response.data;
};

export const createPost = async (postData) => {
  // Check if postData contains a File object
  const formData = new FormData();
  
  if (postData.featuredImage instanceof File) {
    // If it's a file, use FormData
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('category', postData.category);
    formData.append('featuredImage', postData.featuredImage);
    
    const response = await axios.post(`${API_URL}/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data || response.data;
  } else {
    // If it's a URL or empty, use regular JSON
    const response = await api.post('/posts', postData);
    return response.data.data || response.data;
  }
};

export const updatePost = async (id, postData) => {
  // Check if postData contains a File object
  if (postData.featuredImage instanceof File) {
    // If it's a file, use FormData
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('category', postData.category);
    formData.append('featuredImage', postData.featuredImage);
    
    const response = await axios.put(`${API_URL}/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data || response.data;
  } else {
    // If it's a URL or empty, use regular JSON
    const response = await api.put(`/posts/${id}`, postData);
    return response.data.data || response.data;
  }
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

