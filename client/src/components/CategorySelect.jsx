import { usePosts } from '../context/PostsContext';

const CategorySelect = ({ value, onChange, required = false }) => {
  const { categories, loading } = usePosts();

  if (loading) {
    return (
      <select
        disabled
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
      >
        <option>Loading categories...</option>
      </select>
    );
  }

  return (
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;

