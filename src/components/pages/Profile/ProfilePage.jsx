import { Card, Avatar, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useGetArticlesQuery } from "../../api/blogApi";
import PostList from "../../components/posts/PostList";
import styles from "./ProfilePage.module.css";

const { TabPane } = Tabs;

const ProfilePage = () => {
  const { username } = useParams();
  const { data: articlesData } = useGetArticlesQuery({ author: username });

  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <Avatar
            size={128}
            icon={<UserOutlined />}
            className={styles.avatar}
          />
          <h2 className={styles.username}>{username}</h2>
        </div>

        <Tabs defaultActiveKey="1" className={styles.tabs}>
          <TabPane tab="Articles" key="1">
            <PostList
              articles={articlesData?.articles || []}
              loading={!articlesData}
            />
          </TabPane>
          <TabPane tab="Favorites" key="2">
            {/* Можно добавить список избранных статей */}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProfilePage;
