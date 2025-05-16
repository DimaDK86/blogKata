import { useNavigate } from "react-router-dom";
import { useCreateArticleMutation } from "../../api/blogApi";
import { useForm } from "../../hooks/useForm";
import styles from "./ArticleEditor.module.css";

export const ArticleEditor = () => {
  const [createArticle] = useCreateArticleMutation();
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit } = useForm({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  const onSubmit = async () => {
    try {
      const { data } = await createArticle(values);
      navigate(`/article/${data.article.slug}`);
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Article Title"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="What's this article about?"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="body"
            value={values.body}
            onChange={handleChange}
            placeholder="Write your article (in markdown)"
            className={styles.textarea}
            rows={8}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            name="tags"
            value={values.tagList.join(" ")}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "tagList",
                  value: e.target.value.split(" ").filter((tag) => tag.trim()),
                },
              })
            }
            placeholder="Enter tags (space separated)"
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Publish Article
        </button>
      </form>
    </div>
  );
};
