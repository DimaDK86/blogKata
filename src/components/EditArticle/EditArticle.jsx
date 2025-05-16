import { useParams, useNavigate } from "react-router-dom";
import {
  useGetArticleQuery,
  useUpdateArticleMutation,
} from "../../api/blogApi";
import { LoadingIndicator } from "../common/LoadingIndicator/LoadingIndicator";
import { ArticleEditor } from "../ArticleEditor/ArticleEditor";

export const EditArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetArticleQuery(slug);
  const [updateArticle] = useUpdateArticleMutation();

  const handleSubmit = async (articleData) => {
    try {
      await updateArticle({ slug, article: articleData }).unwrap();
      navigate(`/article/${slug}`);
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };

  if (isLoading) return <LoadingIndicator />;

  return (
    <ArticleEditor initialValues={data?.article} onSubmit={handleSubmit} />
  );
};
