import styles from "./RegisterStyle.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/authSlice/authSlice.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const logged = useSelector((state) => state.auth.logged);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
  });
  const fields = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      autoFocus: true,
      validation: (value) =>
        !value.trim() || value.length < 3 || value.length > 20
          ? "Username must be between 3 and 20 characters."
          : "",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email address",
      label: "Email address",
      autoFocus: false,
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email address." : "";
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      autoFocus: false,
      validation: (value) =>
        value.length < 6 || value.length > 40
          ? "Password must be between 6 and 40 characters."
          : "",
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Repeat Password",
      label: "Repeat Password",
      autoFocus: false,
      validation: (value) =>
        value !== formData.password ? "Passwords do not match." : "",
    },
  ];
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = fields.reduce((acc, field) => {
      acc[field.name] = field.validation(formData[field.name]);
      return acc;
    }, {});
    newErrors.agreeToTerms = !formData.agreeToTerms
      ? "You must agree to the terms."
      : "";
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      await dispatch(
        registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      ).unwrap();

      setTimeout(() => {
        navigate("/posts");
      }, 1000);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });
    } catch (error) {
      if (error.username) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: `Username '${formData.username}' ${error.username}`,
        }));
      }
      if (error.email) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: `Email '${formData.email}' ${error.email}`,
        }));
      }
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create new account</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name} className={styles.label}>
            {field.label}
            <input
              autoFocus={field.autoFocus}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`${styles.input} ${errors[field.name] ? styles.inputError : ""}`}
            />
            {errors[field.name] && (
              <p className={styles.errorText}>{errors[field.name]}</p>
            )}
          </label>
        ))}
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className={styles.checkbox}
          />
          {`I agree to the processing of my personal information`}
          {errors.agreeToTerms && (
            <p className={styles.errorText}>{errors.agreeToTerms}</p>
          )}
        </label>
        <button
          type="submit"
          className={`${styles.button} ${loading ? styles.successButton : ""}`}
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : logged
              ? "Success! Redirect to login "
              : "Create"}
        </button>
      </form>
      <p className={styles.footerText}>
        {"Already have an account? "}
        <Link to="/login" className={styles.link}>
          Sign In.
        </Link>
      </p>
    </div>
  );
};
