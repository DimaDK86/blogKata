import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">MyBlog</Link>
      </div>

      <nav className="navigation">
        {isAuthenticated ? (
          <div className="user-menu">
            <span className="username">{user.username}</span>
            <Link to="/new-post">Создать пост</Link>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Войти</Link>
            <Link to="/register">Регистрация</Link>
          </div>
        )}
      </nav>
    </header>
  );
};
