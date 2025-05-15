import styles from "./RegistrationForm.module.css";

export const RegistrationForm = ({
  values,
  errors,
  onChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Username</label>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
          className={`${styles.input} ${errors.username ? styles.error : ""}`}
          placeholder="Enter your username"
        />
        {errors.username && (
          <p className={styles.errorText}>{errors.username}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
          className={`${styles.input} ${errors.email ? styles.error : ""}`}
          placeholder="Enter your email"
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
          className={`${styles.input} ${errors.password ? styles.error : ""}`}
          placeholder="Create a password"
        />
        {errors.password && (
          <p className={styles.errorText}>{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Create Account"}
      </button>
    </form>
  );
};
