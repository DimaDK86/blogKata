import { useGetArticleQuery } from "../../../api/blogApi";
import { useParams } from "react-router-dom";
import PostContent from "./PostContent";
import CommentsSection from "./CommentsSection";
import Spinner from "../../common/Spinner";
import ErrorAlert from "../../common/ErrorAlert";
import styles from "./PostPage.module.css";

const PostPage = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useGetArticleQuery(slug);

  if (isLoading) return <Spinner fullscreen />;
  if (error) return <ErrorAlert error={error} />;

  return (
    <div className={styles.postPage}>
      <PostContent post={data.article} />
      <CommentsSection postSlug={slug} />
    </div>
  );
};

export default PostPage;
