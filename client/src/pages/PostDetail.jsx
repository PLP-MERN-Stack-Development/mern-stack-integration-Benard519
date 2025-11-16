import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePosts } from '../context/PostsContext';
import { format } from 'date-fns';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchPost, removePost, loading, error } = usePosts();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPost(id);
        setPost(data);
      } catch (err) {
        console.error('Failed to load post:', err);
      }
    };
    loadPost();
  }, [id, fetchPost]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await removePost(id);
        navigate('/');
      } catch (err) {
        console.error('Failed to delete post:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error || 'Post not found'}</p>
        <Link to="/" className="text-blue-600 underline mt-2 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  // Handle local uploads vs external URLs
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('/uploads/')) {
      return `http://localhost:5000${imageUrl}`;
    }
    return imageUrl;
  };

  const imageUrl = getImageUrl(post.featuredImage);

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-96 object-cover"
        />
      )}
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {post.category?.name || 'Uncategorized'}
          </span>
          <span className="text-gray-500 text-sm">
            {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
        </div>
        <div className="flex gap-4 pt-6 border-t">
          <Link
            to={`/posts/${id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Edit Post
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete Post
          </button>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;

