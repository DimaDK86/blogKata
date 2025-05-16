import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useGetArticlesQuery } from "../../api/blogApi";
import "./Header.css";

export const Header = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="header">
      {/* <div className="container"> */}
      <Link to="/" className="logo">
        Realworld Blog
      </Link>
      <nav>
        {isAuthenticated ? (
          <div className="user-menu">
            <Link to="/new-article" className="create-btn">
              Create Article
            </Link>
            <div className="user-info">
              <span>{user.username}</span>
              <img src={user.image || "/default-avatar.png"} alt="Avatar" />
            </div>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">
              <button className="signIn">Sign In</button>
            </Link>
            <Link to="/register">
              <button className="signUp">Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
      {/* </div> */}
    </header>
  );
};
