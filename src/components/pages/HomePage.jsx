import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomePage.module.css';

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="home-page">
      <h1>Welcome to RealWorld Blog</h1>
      <div className="actions">
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <Button type="primary">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button style={{ marginLeft: 16 }}>Sign Up</Button>
            </Link>
          </>
        ) : (
          <Link to="/posts">
            <Button type="primary">View Articles</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;