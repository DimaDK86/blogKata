import { useRegisterMutation } from "../../api/userApi";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

export const Register = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      username: "",
      email: "",
      password: "",
    },
    validate,
  );

  const onSubmit = async () => {
    try {
      await register(values).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            className={errors.username ? styles.error : ""}
          />
          {errors.username && (
            <span className={styles.errorMessage}>{errors.username}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={errors.email ? styles.error : ""}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className={errors.password ? styles.error : ""}
          />
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password}</span>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Create
        </button>
      </form>
    </div>
  );
};

function validate(values) {
  const errors = {};
  if (!values.username) errors.username = "Username is required";
  if (!values.email) errors.email = "Email is required";
  if (!values.password) errors.password = "Password is required";
  else if (values.password.length < 6)
    errors.password = "Password must be at least 6 characters";
  return errors;
}
