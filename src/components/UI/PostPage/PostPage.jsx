import style from "./PostPageStyle.module.css";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { Spinner } from "../assets/LoadSpinner/Spinner.jsx";
import { ErrorAlert } from "../assets/ErrorAlert/ErrorAlert.jsx";
import { PostHeader } from "./PostContent/PostHeader/PostHeader.jsx";
import { useGetArticleQuery } from "../../../api/postApi.js";
import { useSelector } from "react-redux";

export const PostPage = () => {
  const { slug } = useParams();
  const token = useSelector((state) =>
    state.auth.user ? state.auth.user.token : null,
  );
  const { data, error, isLoading } = useGetArticleQuery({ slug, token });

  return (
    <div className={style.postPage}>
      {(isLoading && (
        <div className={style.spinner_wrapper}>
          <Spinner />
        </div>
      )) ||
        (error && (
          <div className={style.error_wrapper}>
            <ErrorAlert error={error} />
          </div>
        )) ||
        (data && (
          <>
            <PostHeader {...data.article} token={token} />
            <div className={style.post_mardown}>
              <ReactMarkdown>{data.article.body}</ReactMarkdown>
            </div>
          </>
        ))}
    </div>
  );
};
