import styles from "./ErrorNotification.module.css";

export const ErrorNotification = ({ error }) => {
  return (
    <div className={styles.container}>
      <h3>Error</h3>
      <p>{error?.message || "Something went wrong"}</p>
    </div>
  );
};
