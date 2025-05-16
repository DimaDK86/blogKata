import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostList } from "../components/UI/PostsList/PostList.jsx";
import { NotFound } from "../components/UI/NotFound/NotFound.jsx";
import { Header } from "../components/UI/Header/Header.jsx";
import { PostPage } from "../components/UI/PostPage/PostPage.jsx";
import { Register } from "../components/UI/RegisterPage/Register.jsx";
import { Auth } from "../components/UI/AuthPage/Auth.jsx";
import { EditProfile } from "../components/UI/EditProfile/EditProfile.jsx";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute.jsx";
import { CreatePost } from "../components/UI/CreatePost/CreatePost.jsx";
import { EditPost } from "../components/UI/EditPost/EditPost.jsx";

export const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<PostList />} />
        <Route path="posts" element={<PostList />} />
        <Route path="post/:slug" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Auth />} />
        <Route
          path="login/edit"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="post/create"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="post/edit/:slug"
          element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};
