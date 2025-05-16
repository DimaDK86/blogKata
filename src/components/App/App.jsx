import { Routes, Route } from "react-router-dom";
import { Header } from "../Header/Header";
import { ArticlesList } from "../ArticlesList/ArticlesList";
import { ArticlePage } from "../ArticlePage/ArticlePage";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { ArticleEditor } from "../ArticleEditor/ArticleEditor";
import { EditArticle } from "../EditArticle/EditArticle";
import { ProfilePage } from "../ProfilePage/ProfilePage";

export const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route path="/editor" element={<ArticleEditor />} />
            <Route path="/editor/:slug" element={<EditArticle />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};
