import { Layout } from "antd";
import styles from "./Header.module.css";
import AuthLinks from "./AuthLinks";
import UserMenu from "./UserMenu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Header: AntHeader } = Layout;

/**
 * Шапка приложения с динамическим отображением меню
 * @param {boolean} [darkMode=false] - Темный режим оформления
 */
const Header = ({ darkMode = false }) => {
  const { user } = useSelector((state) => state.auth);
  const headerClass = darkMode ? styles.darkHeader : styles.lightHeader;

  return (
    <AntHeader className={`${styles.header} ${headerClass}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          RealWorld Blog
        </Link>

        <div className={styles.menu}>
          {user ? <UserMenu user={user} /> : <AuthLinks />}
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
