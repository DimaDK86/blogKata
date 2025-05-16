import { useState } from "react";
import { useGetArticlesQuery } from "../../api/blogApi";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import { LoadingIndicator } from "../common/LoadingIndicator/LoadingIndicator";
import { ErrorNotification } from "../common/ErrorNotification/ErrorNotification";
import { PaginationControls } from "../common/Pagination/Pagination";
import styles from "./ArticlesList.module.css";

export const ArticlesList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useGetArticlesQuery({
    limit: 5,
    offset: (page - 1) * 5,
  });

  if (isLoading) return <LoadingIndicator fullScreen />;
  if (isError) return <ErrorNotification error={error} />;

  return (
    <div className={styles.container}>
      <div className={styles.articles}>
        {data?.articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      <PaginationControls
        current={page}
        total={Math.ceil((data?.articlesCount || 0) / 5)}
        onChange={setPage}
      />
    </div>
  );
};
