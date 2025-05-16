import { useGetArticlesQuery } from "../../api/blogApi";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import { LoadingIndicator } from "../common/LoadingIndicator/LoadingIndicator";
import { ErrorNotification } from "../common/ErrorNotification/ErrorNotification";
import { Pagination } from "../common/Pagination/Pagination";
import styles from "./ArticlesList.module.css";
import { useState } from "react";

export const ArticlesList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetArticlesQuery({
    page,
    limit: 5,
  });

  if (isLoading) return <LoadingIndicator fullScreen />;
  if (error) return <ErrorNotification error={error} />;

  return (
    <div className={styles.articlesList}>
      <div className={styles.list}>
        {data?.articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <Pagination
        current={page}
        total={Math.ceil((data?.articlesCount || 0) / 5)}
        onChange={setPage}
      />
    </div>
  );
};
