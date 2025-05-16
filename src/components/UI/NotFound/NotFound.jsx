import styles from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className={styles.notFound_wrapper}>
      <h1>404</h1>
      <p>Page Not found</p>
    </div>
  );
};
