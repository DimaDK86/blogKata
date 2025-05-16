import { useState } from "react";
import { useLoginMutation } from "../../api/userApi";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export const Login = () => {
  const [login] = useLoginMutation();
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    validate,
  );

  const onSubmit = async () => {
    try {
      await login(values).unwrap();
      await checkAuth();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            className={errors.email ? styles.error : ""}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            className={errors.password ? styles.error : ""}
          />
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password}</span>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>
      </form>
    </div>
  );
};

function validate(values) {
  const errors = {};
  if (!values.email) errors.email = "Email is required";
  if (!values.password) errors.password = "Password is required";
  return errors;
}
