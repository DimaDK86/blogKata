import { useParams } from "react-router-dom";
import {
  useGetPostContentQuery,
  useUpdatePostMutation,
} from "../../api/blogApi";
import { ArticleEditor } from "../../components";

export const EditArticle = () => {
  const { slug } = useParams();
  const { data: article, isLoading } = useGetPostContentQuery(slug);
  const [updateArticle] = useUpdatePostMutation();

  const handleSubmit = (updatedData) => {
    updateArticle({ slug, ...updatedData });
  };

  return (
    <div className="edit-article">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ArticleEditor initialData={article} onSubmit={handleSubmit} />
      )}
    </div>
  );
};
