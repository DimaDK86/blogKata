import styles from "./EditPostStyle.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetArticleQuery,
  useUpdateArticleMutation,
} from "../../../api/postApi.js";
import { Spinner } from "../assets/LoadSpinner/Spinner.jsx";
import { ErrorAlert } from "../assets/ErrorAlert/ErrorAlert.jsx";

export const EditPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const token = useSelector((state) => state.auth.user.token);
  const [updateArticle, { isSuccess, isPending }] = useUpdateArticleMutation();
  const { data, error, isLoading } = useGetArticleQuery({ slug, token });

  const [formData, setFormData] = useState({
    title: data.article.title,
    description: data.article.description,
    body: data.article.body,
    tagList: data.article.tagList,
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    body: "",
    tag: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 240) {
      setErrors({
        ...errors,
        description: "Description must be 240 characters or less.",
      });
      return;
    }
    if (name === "title" && value.length > 50) {
      setErrors({
        ...errors,
        title: "Title must be 50 characters or less.",
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleAddTagField = () => {
    setFormData({
      ...formData,
      tagList: [...formData.tagList, ""],
    });
  };
  const handleRemoveTag = (index) => {
    const updatedTags = formData.tagList.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      tagList: updatedTags,
    });
    setErrors({
      ...errors,
      tag: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      title: !formData.title.trim()
        ? "Title is required."
        : formData.title.length > 50
          ? "Title must be 50 characters or less."
          : "",
      description: !formData.description.trim()
        ? "Description is required."
        : formData.description.length > 240
          ? "Description must be 240 characters or less."
          : "",
      body: !formData.body.trim() ? "Text is required." : "",
      tag: formData.tagList.some((tag) => !tag.trim())
        ? "Tags cannot be empty."
        : "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const editedPost = await updateArticle({
        token,
        slug,
        articleData: formData,
      }).unwrap();
      setTimeout(() => {
        navigate(`/post/${editedPost.article.slug}`);
      }, 1000);
    } catch (error) {
      console.error("Failed to update post:", error);
      setErrors({
        ...errors,
        title: "Failed to update post.",
      });
    }
  };
  return (
    <div className={styles.container}>
      {(isLoading && (
        <div className={styles.spinner_wrapper}>
          <Spinner />
        </div>
      )) ||
        (error && (
          <div className={styles.error_wrapper}>
            <ErrorAlert error={error} />
          </div>
        )) || (
          <>
            <h1 className={styles.title}>Edit article</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label}>
                Title
                <input
                  autoFocus
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
                />
                {errors.title && (
                  <p className={styles.errorText}>{errors.title}</p>
                )}
              </label>
              <label className={styles.label}>
                Short description
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Short description"
                  className={`${styles.input} ${errors.description ? styles.inputError : ""}`}
                />
                {errors.description && (
                  <p className={styles.errorText}>{errors.description}</p>
                )}
              </label>
              <label className={styles.label}>
                Text
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  placeholder="Text"
                  className={`${styles.textarea} ${errors.body ? styles.inputError : ""}`}
                />
                {errors.body && (
                  <p className={styles.errorText}>{errors.body}</p>
                )}
              </label>
              <div className={styles.tagsContainer}>
                {formData.tagList.map((tag, index) => (
                  <div key={index} className={styles.tag}>
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => {
                        const updatedTags = [...formData.tagList];
                        updatedTags[index] = e.target.value.slice(0, 12).trim();
                        setFormData({
                          ...formData,
                          tagList: updatedTags,
                        });
                      }}
                      placeholder="Tag"
                      className={`${styles.tagInput} ${errors.tag && !tag.trim() ? styles.inputError : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className={styles.deleteTagButton}
                    >
                      Delete
                    </button>
                    {index === formData.tagList.length - 1 && (
                      <button
                        type="button"
                        onClick={handleAddTagField}
                        className={styles.addTagButton}
                      >
                        Add tag
                      </button>
                    )}
                  </div>
                ))}
                {errors.tag && <p className={styles.errorText}>{errors.tag}</p>}
                {!formData.tagList.length && (
                  <button
                    type="button"
                    onClick={handleAddTagField}
                    className={styles.addTagButton}
                  >
                    Add tag
                  </button>
                )}
              </div>
              <button
                type="submit"
                className={`${styles.button} ${isSuccess ? styles.successButton : ""}`}
                disabled={isPending}
              >
                {isPending
                  ? "Saving..."
                  : isSuccess
                    ? "Success! Redirecting to post"
                    : "Save"}
              </button>
            </form>
          </>
        )}
    </div>
  );
};
