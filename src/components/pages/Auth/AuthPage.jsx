import { Card, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const isLoading = status === "loading";

  const onFinish = async (values) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      navigate("/");
    } catch (err) {
      form.setFields([
        {
          name: "password",
          errors: ["Invalid credentials"],
        },
      ]);
    }
  };

  return (
    <div className={styles.authContainer}>
      <Card title="Sign In" className={styles.authCard}>
        {error && !isLoading && (
          <Alert
            message={error}
            type="error"
            showIcon
            className={styles.alert}
          />
        )}

        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
