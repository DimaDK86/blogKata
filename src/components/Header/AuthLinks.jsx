import { Space } from "antd";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const AuthLinks = () => {
  return (
    <Space size="middle">
      <Link to="/login" className={`${styles.link} ${styles.authLink}`}>
        Sign In
      </Link>
      <Link to="/register" className={`${styles.link} ${styles.linkActive}`}>
        Sign Up
      </Link>
    </Space>
  );
};

export default AuthLinks;
