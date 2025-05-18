import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout/Layout"; // Проверьте правильность пути
import HomePage from "../pages/HomePage/HomePage"; // Добавьте расширение .jsx
import LoginPage from "../pages/auth/LoginPage/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage/RegisterPage";
import ProfilePage from "../pages/profile/ProfilePage/ProfilePage";
import EditProfilePage from "../pages/profile/EditProfilePage/EditProfilePage";
import PostListPage from "../pages/posts/PostListPage/PostListPage";
import PostPage from "../pages/posts/PostPage/PostPage";
import PostCreatePage from "../pages/posts/PostCreatePage/PostCreatePage";
import PostEditPage from "../pages/posts/PostEditPage/PostEditPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="posts" element={<PostListPage />} />
        <Route path="posts/:slug" element={<PostPage />} />
        <Route path="profile/:username" element={<ProfilePage />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="post/create" element={<PostCreatePage />} />
          <Route path="post/edit/:slug" element={<PostEditPage />} />
          <Route path="settings" element={<EditProfilePage />} />
        </Route>

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
