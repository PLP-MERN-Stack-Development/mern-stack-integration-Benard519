import { Routes, Route } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Categories from './pages/Categories';

function App() {
  return (
    <PostsProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Layout>
    </PostsProvider>
  );
}

export default App;

