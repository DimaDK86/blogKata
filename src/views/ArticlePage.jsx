import { useParams } from "react-router-dom";
import { useGetPostContentQuery } from "../../api/blogApi";
import {
  ArticleContent,
  LoadingIndicator,
  ErrorNotification,
} from "../../components";

export const ArticlePage = () => {
  const { slug } = useParams();
  const { data: article, isLoading, error } = useGetPostContentQuery(slug);

  if (isLoading) return <LoadingIndicator fullScreen />;
  if (error) return <ErrorNotification error={error} />;

  return (
    <div className="article-page">
      <ArticleContent {...article} />
    </div>
  );
};
