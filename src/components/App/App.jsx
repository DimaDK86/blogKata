import { Routes, Route } from "react-router-dom";
import { Header } from "../Header/Header";
import { ArticlesList } from "../ArticlesList/ArticlesList";
import { ArticlePage } from "../ArticlePage/ArticlePage";
import { Login } from "../Login/Login";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { ArticleEditor } from "../ArticleEditor/ArticleEditor";

export const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          {/* Главная страница со списком статей */}
          <Route path="/" element={<ArticlesList />} />

          {/* Страница отдельной статьи */}
          <Route path="/articles/:slug" element={<ArticlePage />} />

          {/* Защищенные маршруты */}
          <Route element={<PrivateRoute />}>
            <Route path="/create-article" element={<ArticleEditor />} />
          </Route>

          {/* Авторизация */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
};
