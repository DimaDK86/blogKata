import { Link } from "react-router-dom";
import { formatDate } from "../../utils/dateFormatter";
import styles from "./ArticleContent.module.css";

export const ArticleContent = ({ article }) => {
  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.meta}>
          <Link
            to={`/profile/${article.author.username}`}
            className={styles.author}
          >
            <img
              src={article.author.image || "/default-avatar.png"}
              alt={article.author.username}
              className={styles.avatar}
            />
            <div>
              <span className={styles.username}>{article.author.username}</span>
              <span className={styles.date}>
                {formatDate(article.createdAt)}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <p>{article.body}</p>
      </div>
      {article.tagList.length > 0 && (
        <div className={styles.tags}>
          {article.tagList.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};
