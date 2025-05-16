import { Post } from "./Post/Post.jsx";
import style from "./PostList.module.css";
import { ErrorAlert } from "../assets/ErrorAlert/ErrorAlert.jsx";
import { Spinner } from "../assets/LoadSpinner/Spinner.jsx";
import { useGetArticlesQuery } from "../../../api/postApi.js";
import { MemoizedPaginationPosts } from "../assets/Pagination/Pagination";
import { useState } from "react";
import { useSelector } from "react-redux";

export const PostList = () => {
  const token = useSelector((state) =>
    state.auth.user ? state.auth.user.token : null,
  );
  const [offset, setOffset] = useState(0);
  const { data, error, isLoading, isError } = useGetArticlesQuery({
    limit: 5,
    offset: offset,
    token,
  });

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  return (
    (isLoading && (
      <div className={style.spinner_wrapper}>
        <Spinner />
      </div>
    )) ||
    (isError && <ErrorAlert error={error} />) || (
      <div className={style.posts_wrapper}>
        {data.articles.map((article) => (
          <Post key={article.slug} {...article} token={token} />
        ))}
        <MemoizedPaginationPosts
          countPosts={data.articlesCount}
          handlePageChange={handlePageChange}
          currentPage={1}
        />
      </div>
    )
  );
};
