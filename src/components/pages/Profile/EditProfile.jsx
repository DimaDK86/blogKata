import { useState, useEffect } from "react";
import { Card, Form, Input, Button, Upload, message, Avatar } from "antd";
import { UserOutlined, MailOutlined, CameraOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../api/blogApi";
import { fetchCurrentUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/common/ErrorAlert";
import Spinner from "../../components/common/Spinner";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateUser, { error, isLoading }] = useUpdateUserMutation();
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        bio: user.bio || "",
      });
      setPreviewImage(user.image || "");
    }
  }, [user, form]);

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);
    return false; // Prevent automatic upload
  };

  const onFinish = async (values) => {
    try {
      const updateData = {
        username: values.username,
        email: values.email,
        bio: values.bio,
      };

      if (values.password) {
        updateData.password = values.password;
      }

      if (imageFile) {
        updateData.image = previewImage;
      }

      await updateUser(updateData).unwrap();
      await dispatch(fetchCurrentUser()).unwrap();

      message.success("Profile updated successfully");
      navigate(`/profile/${values.username}`);
    } catch (err) {
      message.error(err.data?.errors?.message || "Failed to update profile");
    }
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject("The two passwords do not match!");
    },
  });

  if (!user) return <Spinner fullscreen />;

  return (
    <div className={styles.profileContainer}>
      <Card title="Edit Profile" className={styles.profileCard}>
        {error && <ErrorAlert error={error} className={styles.errorAlert} />}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item className={styles.avatarUpload}>
            <Upload
              name="avatar"
              listType="picture-circle"
              showUploadList={false}
              beforeUpload={handleBeforeUpload}
              accept="image/*"
            >
              {previewImage ? (
                <Avatar
                  src={previewImage}
                  size={100}
                  icon={<UserOutlined />}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.uploadTrigger}>
                  <CameraOutlined style={{ fontSize: 24 }} />
                  <div>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 3, message: "Username must be at least 3 characters" },
              { max: 20, message: "Username must be at most 20 characters" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="bio"
            label="Bio"
            rules={[
              { max: 200, message: "Bio must be less than 200 characters" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Tell us about yourself"
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Leave blank to keep current" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[validatePassword]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
              size="large"
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProfile;
