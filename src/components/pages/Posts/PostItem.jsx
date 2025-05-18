import { Card, Avatar, Tag, Space } from "antd";
import { HeartFilled, HeartOutlined, CommentOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from "../../../api/blogApi";
import { useSelector } from "react-redux";
import formatDate from "../../../utils/formatDate";
import styles from "./PostItem.module.css";

const PostItem = ({ post }) => {
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();
  const { user } = useSelector((state) => state.auth);
  const isLiked = post.favorited;
  const isAuthor = user?.username === post.author.username;

  const handleLike = async () => {
    if (!user) return;
    const mutation = isLiked ? unlikeArticle : likeArticle;
    await mutation(post.slug);
  };

  return (
    <Card className={styles.postItem}>
      <div className={styles.postHeader}>
        <Link to={`/profile/${post.author.username}`} className={styles.author}>
          <Avatar src={post.author.image} size={48} />
          <div className={styles.authorInfo}>
            <span className={styles.username}>{post.author.username}</span>
            <span className={styles.date}>{formatDate(post.createdAt)}</span>
          </div>
        </Link>

        <div className={styles.actions}>
          <Space size="middle">
            <button
              onClick={handleLike}
              className={`${styles.likeButton} ${!user ? styles.disabled : ""}`}
            >
              {isLiked ? (
                <HeartFilled style={{ color: "#ff4d4f" }} />
              ) : (
                <HeartOutlined />
              )}
              <span>{post.favoritesCount}</span>
            </button>

            <Link
              to={`/post/${post.slug}#comments`}
              className={styles.comments}
            >
              <CommentOutlined />
              <span>{post.commentsCount || 0}</span>
            </Link>
          </Space>
        </div>
      </div>

      <Link to={`/post/${post.slug}`} className={styles.postContent}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.description}>{post.description}</p>
      </Link>

      <div className={styles.postFooter}>
        <Space size={4} wrap>
          {post.tagList.map((tag) => (
            <Tag key={tag} className={styles.tag}>
              {tag}
            </Tag>
          ))}
        </Space>

        {isAuthor && (
          <Link to={`/post/edit/${post.slug}`} className={styles.editLink}>
            Edit
          </Link>
        )}
      </div>
    </Card>
  );
};

export default PostItem;
