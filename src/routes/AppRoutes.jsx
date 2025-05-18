import { Routes, Route } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import HomePage from '../components/pages/HomePage';
import LoginPage from '../components/'; 
import RegisterPage from '../components/pages/Register/RegisterPage';
import ProfilePage from '../components/pages/Profile/ProfilePage';
import EditProfilePage from '../components/pages/Profile/ProfilePage';
import PostListPage from '../components/pages/Posts/PostList';
import PostPage from '../components/pages/Posts/PostPage';
import PostCreatePage from '../components/pages/Posts/';
import PostEditPage from '@pages/posts/PostEditPage';
import NotFoundPage from '@pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="posts" element={<PostListPage />} />
        <Route path="posts/:slug" element={<PostPage />} />
        <Route path="profile/:username" element={<ProfilePage />} />

        <Route element={<PrivateRoute />}>
          <Route path="post/create" element={<PostCreatePage />} />
          <Route path="post/edit/:slug" element={<PostEditPage />} />
          <Route path="settings" element={<EditProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;