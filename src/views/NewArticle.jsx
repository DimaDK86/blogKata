import { useCreatePostMutation } from "../../api/blogApi";
import { ArticleEditor } from "../../components";

export const NewArticle = () => {
  const [createPost] = useCreatePostMutation();

  const handleSubmit = (postData) => {
    createPost(postData);
  };

  return (
    <div className="new-article">
      <ArticleEditor onSubmit={handleSubmit} />
    </div>
  );
};
