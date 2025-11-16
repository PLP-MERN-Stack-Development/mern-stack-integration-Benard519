import { createContext, useContext, useState, useEffect } from 'react';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../api/posts';
import { getCategories } from '../api/categories';

const PostsContext = createContext();

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within PostsProvider');
  }
  return context;
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all posts
  const fetchPosts = async (search = '', category = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts(search, category);
      setPosts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch single post
  const fetchPost = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPost(id);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create post
  const addPost = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const newPost = await createPost(postData);
      setPosts((prev) => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      setError(err.message || 'Failed to create post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update post
  const editPost = async (id, postData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPost = await updatePost(id, postData);
      setPosts((prev) =>
        prev.map((post) => (post._id === id ? updatedPost : post))
      );
      return updatedPost;
    } catch (err) {
      setError(err.message || 'Failed to update post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const removePost = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete post');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
    }
  };

  // Load initial data
  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  // Filter posts when search or category changes
  useEffect(() => {
    fetchPosts(searchTerm, selectedCategory);
  }, [searchTerm, selectedCategory]);

  const value = {
    posts,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    fetchPosts,
    fetchPost,
    addPost,
    editPost,
    removePost,
    fetchCategories,
  };

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
};

