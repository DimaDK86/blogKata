import styles from "./LoadingIndicator.module.css";

export const LoadingIndicator = ({ fullScreen = false }) => {
  return (
    <div
      className={`${styles.container} ${fullScreen ? styles.fullScreen : ""}`}
    >
      <div className={styles.spinner}></div>
    </div>
  );
};
