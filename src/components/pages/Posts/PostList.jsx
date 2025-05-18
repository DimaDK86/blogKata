import { useGetArticlesQuery } from "../../../api/blogApi";
import PostItem from "./PostItem";
import Pagination from "../../common/Pagination";
import Spinner from "../../common/Spinner";
import ErrorAlert from "../../common/ErrorAlert";
import { useState } from "react";
import styles from "./PostList.module.css";

const PostList = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetArticlesQuery({
    offset: (page - 1) * 5,
    limit: 5,
  });

  if (isLoading) return <Spinner fullscreen />;
  if (error) return <ErrorAlert error={error} />;

  return (
    <div className={styles.postList}>
      {data.articles.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}

      {data.articlesCount > 5 && (
        <Pagination
          current={page}
          total={data.articlesCount}
          pageSize={5}
          onChange={setPage}
          className={styles.pagination}
        />
      )}
    </div>
  );
};

export default PostList;
