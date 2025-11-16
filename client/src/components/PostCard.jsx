import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const PostCard = ({ post }) => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {post.category?.name || 'Uncategorized'}
          </span>
          <span className="text-gray-500 text-sm">
            {format(new Date(post.createdAt), 'MMM dd, yyyy')}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
        <Link
          to={`/posts/${post._id}`}
          className="text-blue-600 font-semibold hover:text-blue-800 inline-flex items-center"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;

