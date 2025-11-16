import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import CategorySelect from '../components/CategorySelect';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPost, editPost, loading } = usePosts();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    featuredImage: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [useFileUpload, setUseFileUpload] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await fetchPost(id);
        const imageUrl = post.featuredImage || '';
        setFormData({
          title: post.title || '',
          content: post.content || '',
          category: post.category?._id || '',
          featuredImage: imageUrl,
        });
        // If existing image is a local upload, show it
        if (imageUrl && imageUrl.startsWith('/uploads/')) {
          setImagePreview(`http://localhost:5000${imageUrl}`);
        } else if (imageUrl) {
          setImagePreview(imageUrl);
        }
      } catch (err) {
        console.error('Failed to load post:', err);
      }
    };
    loadPost();
  }, [id, fetchPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const postData = {
        ...formData,
        featuredImage: useFileUpload && imageFile ? imageFile : formData.featuredImage,
      };
      await editPost(id, postData);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter post title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <CategorySelect
            value={formData.category}
            onChange={(e) => handleChange({ target: { name: 'category', value: e.target.value } })}
            required
          />
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image (optional)
          </label>
          <div className="mb-3">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                checked={!useFileUpload}
                onChange={() => {
                  setUseFileUpload(false);
                  setImageFile(null);
                }}
                className="mr-2"
              />
              Use URL
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={useFileUpload}
                onChange={() => {
                  setUseFileUpload(true);
                  setFormData((prev) => ({ ...prev, featuredImage: '' }));
                }}
                className="mr-2"
              />
              Upload File
            </label>
          </div>
          
          {!useFileUpload ? (
            <input
              type="url"
              id="featuredImage"
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          ) : (
            <div>
              <input
                type="file"
                id="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-48 object-cover rounded-md border border-gray-300"
                  />
                </div>
              )}
            </div>
          )}
          {imagePreview && !useFileUpload && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Current Image:</p>
              <img
                src={imagePreview}
                alt="Current"
                className="max-w-full h-48 object-cover rounded-md border border-gray-300"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={12}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Write your post content here..."
          />
          {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;

