import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/dateFormatter";
import styles from "./ArticleCard.module.css";

export const ArticleCard = ({ article }) => {
  return (
    <article className={styles.articleCard}>
      <div className={styles.meta}>
        <div className={styles.authorInfo}>
          <img
            src={article.author.image || "/default-avatar.png"}
            alt={article.author.username}
            className={styles.avatar}
          />
          <div>
            <h4 className={styles.username}>{article.author.username}</h4>
            <time className={styles.date}>{formatDate(article.createdAt)}</time>
          </div>
        </div>
        <div className={styles.likes}>♥ {article.favoritesCount}</div>
      </div>

      <Link to={`/article/${article.slug}`} className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.description}>{article.description}</p>
      </Link>

      {article.tagList?.length > 0 && (
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
