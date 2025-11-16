import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700 hover:text-blue-600';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MERN Blog
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
            <Link to="/posts/new" className={isActive('/posts/new')}>
              New Post
            </Link>
            <Link to="/categories" className={isActive('/categories')}>
              Categories
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

