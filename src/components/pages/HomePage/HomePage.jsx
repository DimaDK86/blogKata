import { Button } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../store/slices/authSlice";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to RealWorld Blog</h1>
      <p className={styles.subtitle}>
        A place to share your knowledge and experience
      </p>
      <div className={styles.actions}>
        {!isAuthenticated && (
          <>
            <Link to="/login">
              <Button type="primary" size="large">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button size="large" style={{ marginLeft: 16 }}>
                Sign Up
              </Button>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <Link to="/posts">
            <Button type="primary" size="large">
              View Articles
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
