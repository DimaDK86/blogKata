import { Routes, Route } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/auth/LoginPage';
import RegisterPage from '@pages/auth/RegisterPage';
import ProfilePage from '@pages/profile/ProfilePage';
import EditProfilePage from '@pages/profile/EditProfilePage';
import PostListPage from '@pages/posts/PostListPage';
import PostPage from '@pages/posts/PostPage';
import PostCreatePage from '@pages/posts/PostCreatePage';
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