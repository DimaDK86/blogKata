import { Dropdown, Menu, Avatar, Space } from "antd";
import {
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice";
import styles from "./Header.module.css";

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to={`/profile/${user.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="create" icon={<PlusOutlined />}>
        <Link to="/post/create">Create Article</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<EditOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => dispatch(logout())}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Space size="middle">
      <Link
        to="/post/create"
        className={`${styles.link} ${styles.createButton}`}
      >
        <PlusOutlined /> Create Post
      </Link>

      <Dropdown overlay={menu} trigger={["click"]}>
        <Space className={styles.userAvatar}>
          <Avatar
            src={user.image}
            icon={<UserOutlined />}
            alt={user.username}
          />
          <span className={styles.username}>{user.username}</span>
        </Space>
      </Dropdown>
    </Space>
  );
};

export default UserMenu;
