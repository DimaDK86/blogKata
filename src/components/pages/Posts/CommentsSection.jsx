import { List, Comment, Form, Input, Button, Avatar, message } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/slices/authSlice";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
} from "../../../api/blogApi";
import styles from "./CommentsSection.module.css";

const { TextArea } = Input;

const CommentsSection = ({ postSlug }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [form] = Form.useForm();
  const {
    data: commentsData,
    isLoading,
    error,
  } = useGetCommentsQuery(postSlug);
  const [addComment] = useAddCommentMutation();

  const onFinish = async (values) => {
    try {
      await addComment({ slug: postSlug, body: values.comment }).unwrap();
      form.resetFields();
      message.success("Comment added successfully");
    } catch (err) {
      message.error("Failed to add comment");
    }
  };

  if (error) return <div>Failed to load comments</div>;

  return (
    <div className={styles.commentsSection}>
      <h3 className={styles.title}>
        Comments ({commentsData?.comments.length || 0})
      </h3>

      {currentUser && (
        <Form form={form} onFinish={onFinish} className={styles.commentForm}>
          <Form.Item name="comment" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Write a comment..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Post Comment
            </Button>
          </Form.Item>
        </Form>
      )}

      <List
        className={styles.commentList}
        itemLayout="horizontal"
        loading={isLoading}
        dataSource={commentsData?.comments || []}
        renderItem={(item) => (
          <li>
            <Comment
              author={item.author.username}
              avatar={
                <Avatar src={item.author.image} alt={item.author.username} />
              }
              content={item.body}
              datetime={new Date(item.createdAt).toLocaleDateString()}
            />
          </li>
        )}
      />
    </div>
  );
};

export default CommentsSection;
