import styles from "./Auth.module.css";
import { Link } from "react-router-dom";

export const Auth = () => {
  let linkActive = styles.link__active + " " + styles.link;
  return (
    <div className={styles.navbar__auth}>
      <Link className={styles.link} to="/login">
        Sign In
      </Link>
      <Link className={linkActive} to="/register">
        Sign Up
      </Link>
    </div>
  );
};
