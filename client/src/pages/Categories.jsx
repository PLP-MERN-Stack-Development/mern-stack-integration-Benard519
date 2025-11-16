import { useState } from 'react';
import { usePosts } from '../context/PostsContext';
import { createCategory } from '../api/categories';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { categories, fetchCategories, loading } = usePosts();
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      await createCategory({ name: categoryName.trim() });
      setSuccess('Category created successfully!');
      setCategoryName('');
      fetchCategories();
    } catch (err) {
      setError(err.message || 'Failed to create category');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Categories</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New Category</h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">All Categories</h2>
        {loading ? (
          <p className="text-gray-600">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-600">No categories found. Create one above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category._id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <Link
                  to={`/?category=${category._id}`}
                  className="text-lg font-medium text-blue-600 hover:text-blue-800"
                >
                  {category.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">Slug: {category.slug}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;

