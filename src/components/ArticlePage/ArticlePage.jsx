import { useParams } from "react-router-dom";
import { useGetArticleQuery } from "../../api/blogApi";
import { LoadingIndicator } from "../common/LoadingIndicator/LoadingIndicator";
import { ErrorNotification } from "../common/ErrorNotification/ErrorNotification";
import { ArticleContent } from "../ArticleContent/ArticleContent";

export const ArticlePage = () => {
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useGetArticleQuery(slug);

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorNotification error={error} />;

  return (
    <div className="article-page">
      <ArticleContent article={data?.article} />
    </div>
  );
};
