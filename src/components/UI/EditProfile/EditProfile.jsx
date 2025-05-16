import styles from "./EditProfileStyle.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  editUserProfile,
} from "../../../store/authSlice/authSlice.js";

export const EditProfile = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user, loading, logged } = useSelector((state) => state.auth);
  const token = user.token;

  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    password: "",
    image: user.image || "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });
  const fields = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      autoFocus: false,
      label: "New Username",
      validation: (value) =>
        !value.trim() || value.length < 3 || value.length > 20
          ? "Username must be between 3 and 20 characters."
          : "",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email address",
      label: "New Email address",
      autoFocus: false,
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email address." : "";
      },
    },
    {
      name: "password",
      type: "password",
      autoFocus: true,
      placeholder: "Password",
      label: "New Password",
      validation: (value) =>
        value.length < 6 || value.length > 40
          ? "Password must be between 6 and 40 characters."
          : "",
    },
    {
      name: "image",
      type: "text",
      placeholder: "Avatar image (url)",
      label: "Avatar image (url)",
      autoFocus: false,
      validation: (value) => {
        const urlRegex =
          /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?(\?.*)?(\.(jpg|jpeg|png|gif|webp|svg))$/i;
        return !urlRegex.test(value)
          ? "Invalid URL for avatar. Supported formats: .jpg, .jpeg, .png, .gif, .webp, .svg."
          : "";
      },
    },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }
    try {
      await dispatch(editUserProfile({ token, userData: formData })).unwrap();
      await dispatch(fetchCurrentUser()).unwrap();
      setTimeout(() => {
        navigate("/posts");
      }, 1000);
    } catch (error) {
      console.error("Profile update failed:", error);
      setErrors({
        ...errors,
        username: "Failed to update profile.",
      });
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit profile</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {fields.map((field) => (
          <label key={field.name} className={styles.label}>
            {field.label}
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              autoFocus={field.autoFocus}
              placeholder={field.placeholder}
              className={`${styles.input} ${errors[field.name] ? styles.inputError : ""}`}
            />
            {errors[field.name] && (
              <p className={styles.errorText}>{errors[field.name]}</p>
            )}
          </label>
        ))}
        <button
          type="submit"
          className={`${styles.button} ${logged ? styles.successButton : ""}`}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : loading
              ? "Success! Redirect 3 s to posts "
              : "Save"}
        </button>
      </form>
    </div>
  );
};
