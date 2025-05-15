import { formatDate } from "../../../../utils/dateFormatter";

export const ArticleCard = ({
  title,
  description,
  author,
  createdAt,
  slug,
}) => {
  return (
    <article className="article-card">
      <h3>{title}</h3>
      <p className="description">{description}</p>
      <div className="meta">
        <span className="author">{author.username}</span>
        <span className="date">{formatDate(createdAt)}</span>
      </div>
    </article>
  );
};
