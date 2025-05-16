import { useParams } from "react-router-dom";
import { useGetArticlesQuery } from "../../api/blogApi";
import { ArticlesList } from "../ArticlesList/ArticlesList";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const { username } = useParams();
  const { data: articlesData } = useGetArticlesQuery({
    author: username,
    limit: 5,
    offset: 0,
  });

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <h2>{username}'s Profile</h2>
      </div>
      <div className={styles.articles}>
        <h3>Articles</h3>
        <ArticlesList articles={articlesData?.articles} />
      </div>
    </div>
  );
};
